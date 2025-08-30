import os
import uuid
import logging
from datetime import datetime
from typing import List, Optional, Dict, Any
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage
from langgraph.checkpoint.memory import MemorySaver
from models import ChatResponse, ToolCall, Message, HealthResponse

# Remove the problematic imports at module level
# from app import (
#     part_1_graph, 
#     memory,
#     db,
#     update_dates
# )

logger = logging.getLogger(__name__)

class AgentService:
    """Service class for managing LangGraph agent interactions"""
    
    def __init__(self):
        """Initialize the agent service"""
        # Lazy load components to avoid startup issues
        self._graph = None
        self._memory = None
        self._db_path = None
        self._update_dates = None
        logger.info("Agent service initialized successfully")
    
    def _get_components(self):
        """Lazy load components from app.py"""
        if self._graph is None:
            try:
                from app import part_1_graph, memory, db, update_dates
                self._graph = part_1_graph
                self._memory = memory
                self._db_path = db
                self._update_dates = update_dates
                logger.info("Successfully loaded agent components")
            except Exception as e:
                logger.error(f"Failed to load agent components: {str(e)}")
                raise Exception(f"Failed to load agent components: {str(e)}")
    
    @property
    def graph(self):
        """Get the graph component"""
        self._get_components()
        return self._graph
    
    @property
    def memory(self):
        """Get the memory component"""
        self._get_components()
        return self._memory
    
    @property
    def db_path(self):
        """Get the database path"""
        self._get_components()
        return self._db_path
    
    async def process_message(
        self, 
        message: str, 
        passenger_id: str, 
        thread_id: Optional[str] = None
    ) -> ChatResponse:
        """
        Process a user message through the agent
        
        Args:
            message: User message to process
            passenger_id: Passenger ID for the user
            thread_id: Optional thread ID for conversation continuity
            
        Returns:
            ChatResponse with agent's response and metadata
        """
        try:
            # Generate thread_id if not provided
            if not thread_id:
                thread_id = self.create_new_thread()
            
            # Configure the agent with passenger_id and thread_id
            config = {
                "configurable": {
                    "passenger_id": passenger_id,
                    "thread_id": thread_id,
                }
            }
            
            # Process the message through the agent
            logger.info(f"Processing message for passenger {passenger_id} in thread {thread_id}")
            
            # Stream the agent's response
            events = self.graph.stream(
                {"messages": ("user", message)}, 
                config, 
                stream_mode="values"
            )
            
            # Collect the final response
            final_response = None
            tool_calls_made = []
            
            for event in events:
                if "messages" in event:
                    messages = event["messages"]
                    if messages:
                        last_message = messages[-1]
                        if hasattr(last_message, 'content') and last_message.content:
                            if hasattr(last_message, 'type') and last_message.type == 'ai':
                                final_response = last_message.content
                            
                            # Extract tool calls if present
                            if hasattr(last_message, 'tool_calls') and last_message.tool_calls:
                                for tool_call in last_message.tool_calls:
                                    tool_calls_made.append(ToolCall(
                                        name=tool_call.get('name', ''),
                                        args=tool_call.get('args', {}),
                                        result=None  # We don't have access to results in this context
                                    ))
            
            if not final_response:
                final_response = "I apologize, but I couldn't process your request properly. Please try again."
            
            return ChatResponse(
                response=final_response,
                thread_id=thread_id,
                timestamp=datetime.now(),
                tool_calls=tool_calls_made if tool_calls_made else None
            )
            
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            raise Exception(f"Failed to process message: {str(e)}")
    
    def create_new_thread(self) -> str:
        """
        Create a new conversation thread
        
        Returns:
            New thread ID
        """
        thread_id = str(uuid.uuid4())
        logger.info(f"Created new thread: {thread_id}")
        return thread_id
    
    async def get_conversation_history(self, thread_id: str) -> List[Message]:
        """
        Get conversation history for a thread
        
        Args:
            thread_id: Thread ID to get history for
            
        Returns:
            List of messages in the conversation
        """
        try:
            # This is a simplified implementation
            # In a real scenario, you'd retrieve from the memory checkpointer
            logger.info(f"Retrieving conversation history for thread {thread_id}")
            
            # For now, return empty list as we need to implement proper history retrieval
            # This would require accessing the memory checkpointer's stored state
            return []
            
        except Exception as e:
            logger.error(f"Error retrieving conversation history: {str(e)}")
            raise Exception(f"Failed to retrieve conversation history: {str(e)}")
    
    def health_check(self) -> HealthResponse:
        """
        Perform health check on the agent service
        
        Returns:
            HealthResponse with service status
        """
        try:
            # Check database connectivity
            database_connected = self._check_database_health()
            
            # Check agent readiness
            agent_ready = self._check_agent_health()
            
            status = "healthy" if database_connected and agent_ready else "unhealthy"
            
            return HealthResponse(
                status=status,
                database_connected=database_connected,
                agent_ready=agent_ready,
                timestamp=datetime.now()
            )
            
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return HealthResponse(
                status="unhealthy",
                database_connected=False,
                agent_ready=False,
                timestamp=datetime.now()
            )
    
    def _check_database_health(self) -> bool:
        """Check if database is accessible"""
        try:
            import sqlite3
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            conn.close()
            return True
        except Exception as e:
            logger.error(f"Database health check failed: {str(e)}")
            return False
    
    def _check_agent_health(self) -> bool:
        """Check if agent is ready"""
        try:
            # Simple check to see if graph is available
            return self.graph is not None and self.memory is not None
        except Exception as e:
            logger.error(f"Agent health check failed: {str(e)}")
            return False