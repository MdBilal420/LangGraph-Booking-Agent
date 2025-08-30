import sqlite3
import random
import shutil

# Path to your SQLite file
db_path = "travel2.sqlite"
updated_path = "travel2_updated.sqlite"

# Copy original to updated file
shutil.copy(db_path, updated_path)

# Connect to DB
conn = sqlite3.connect(updated_path)
cursor = conn.cursor()

# Get all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in cursor.fetchall()]

# Possible months and year
months = [8, 9, 10]
year = 2025

# Function to get random date
def random_date():
    month = random.choice(months)
    if month == 2:
        last_day = 28
    elif month in [4, 6, 9, 11]:
        last_day = 30
    else:
        last_day = 31
    day = random.randint(1, last_day)
    return f"{year}-{month:02d}-{day:02d}"

# Iterate over tables and update date columns
for table in tables:
    cursor.execute(f"PRAGMA table_info({table})")
    columns_info = cursor.fetchall()
    for col in columns_info:
        col_name = col[1]
        col_type = col[2].lower()
        if "date" in col_name.lower():
            cursor.execute(f"""
                UPDATE {table}
                SET {col_name} = ?
                WHERE {col_name} LIKE '____-__-__'
            """, (random_date(),))
            print(f"Updated {col_name} in {table}")

conn.commit()
conn.close()

print(f"Updated file saved as: {updated_path}")
