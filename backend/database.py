import os
import sqlite3
import shutil
import requests
import pandas as pd
import logging
from typing import Optional
from contextlib import contextmanager

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Manager for SQLite database operations and health checks"""
    
    def __init__(self, db_path: str = "travel2.sqlite"):
        """
        Initialize database manager
        
        Args:
            db_path: Path to the SQLite database file
        """
        self.db_path = db_path
        self.backup_path = "travel2.backup.sqlite"
        self.db_url = "https://storage.googleapis.com/benchmarks-artifacts/travel-db/travel2.sqlite"
        self._initialized = False
        logger.info(f"Database manager initialized with path: {db_path}")
    
    def _ensure_initialized(self):
        """Lazy initialize the database on first use"""
        if self._initialized:
            return
        try:
            # Download database if it doesn't exist
            if not os.path.exists(self.db_path):
                logger.info("Downloading travel database...")
                response = requests.get(self.db_url)
                response.raise_for_status()
                
                with open(self.db_path, "wb") as f:
                    f.write(response.content)
                
                # Create backup
                shutil.copy(self.db_path, self.backup_path)
                logger.info("Database downloaded and backup created")
            
            # Update dates to current time
            self.update_dates()
            self._initialized = True
            
        except Exception as e:
            logger.error(f"Failed to initialize database: {str(e)}")
            raise Exception(f"Database initialization failed: {str(e)}")
    
    def update_dates(self) -> str:
        """
        Update database dates to current time for realistic data
        
        Returns:
            Path to the updated database file
        """
        try:
            self._ensure_initialized()
            # Restore from backup
            if os.path.exists(self.backup_path):
                shutil.copy(self.backup_path, self.db_path)
            
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            # Get all table names
            tables = pd.read_sql(
                "SELECT name FROM sqlite_master WHERE type='table';", conn
            ).name.tolist()
            
            # Load all tables
            tdf = {}
            for t in tables:
                tdf[t] = pd.read_sql(f"SELECT * from {t}", conn)

            # Calculate time difference
            example_time = pd.to_datetime(
                tdf["flights"]["actual_departure"].replace("\\N", pd.NaT)
            ).max()
            current_time = pd.to_datetime("now").tz_localize(example_time.tz)
            time_diff = current_time - example_time

            # Update booking dates
            tdf["bookings"]["book_date"] = (
                pd.to_datetime(tdf["bookings"]["book_date"].replace("\\N", pd.NaT), utc=True)
                + time_diff
            )

            # Update flight datetime columns
            datetime_columns = [
                "scheduled_departure",
                "scheduled_arrival", 
                "actual_departure",
                "actual_arrival",
            ]
            for column in datetime_columns:
                tdf["flights"][column] = (
                    pd.to_datetime(tdf["flights"][column].replace("\\N", pd.NaT)) + time_diff
                )

            # Write updated data back to database
            for table_name, df in tdf.items():
                df.to_sql(table_name, conn, if_exists="replace", index=False)
            
            conn.commit()
            conn.close()
            
            logger.info("Database dates updated successfully")
            return self.db_path
            
        except Exception as e:
            logger.error(f"Failed to update database dates: {str(e)}")
            raise Exception(f"Database date update failed: {str(e)}")
    
    @contextmanager
    def get_connection(self):
        """
        Context manager for database connections
        
        Yields:
            SQLite connection object
        """
        self._ensure_initialized()
        conn = None
        try:
            conn = sqlite3.connect(self.db_path)
            yield conn
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Database connection error: {str(e)}")
            raise
        finally:
            if conn:
                conn.close()
    
    def health_check(self) -> bool:
        """
        Perform database health check
        
        Returns:
            True if database is healthy, False otherwise
        """
        try:
            self._ensure_initialized()
            with self.get_connection() as conn:
                cursor = conn.cursor()
                
                # Test basic connectivity
                cursor.execute("SELECT 1")
                
                # Check if main tables exist
                cursor.execute("""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name IN ('flights', 'tickets', 'hotels', 'car_rentals')
                """)
                tables = cursor.fetchall()
                
                # Should have at least the main tables
                if len(tables) < 4:
                    logger.warning("Some required tables are missing")
                    return False
                
                logger.info("Database health check passed")
                return True
                
        except Exception as e:
            logger.error(f"Database health check failed: {str(e)}")
            return False
    
    def get_table_info(self, table_name: str) -> Optional[list]:
        """
        Get information about a specific table
        
        Args:
            table_name: Name of the table to inspect
            
        Returns:
            List of column information or None if table doesn't exist
        """
        try:
            self._ensure_initialized()
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(f"PRAGMA table_info({table_name})")
                return cursor.fetchall()
                
        except Exception as e:
            logger.error(f"Failed to get table info for {table_name}: {str(e)}")
            return None
    
    def execute_query(self, query: str, params: tuple = ()) -> list:
        """
        Execute a SELECT query and return results
        
        Args:
            query: SQL query to execute
            params: Query parameters
            
        Returns:
            List of query results
        """
        try:
            self._ensure_initialized()
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(query, params)
                return cursor.fetchall()
                
        except Exception as e:
            logger.error(f"Query execution failed: {str(e)}")
            raise Exception(f"Database query failed: {str(e)}")

# Remove the global database manager instance
# db_manager = DatabaseManager()