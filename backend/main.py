from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Configure LangSmith tracing
os.environ["LANGCHAIN_TRACING_V2"] = os.getenv("LANGSMITH_TRACING", "true")
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGSMITH_API_KEY", "")
os.environ["LANGCHAIN_ENDPOINT"] = os.getenv("LANGSMITH_ENDPOINT", "https://api.smith.langchain.com")
os.environ["LANGCHAIN_PROJECT"] = os.getenv("LANGSMITH_PROJECT", "Travel Agent API")

# Import models and services
from models import (
    ChatRequest, ChatResponse, NewThreadRequest, ThreadResponse,
    HistoryResponse, HealthResponse, ErrorResponse
)
from agent_service import AgentService
from database import DatabaseManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log LangSmith configuration
logger.info(f"LangSmith Tracing: {os.environ.get('LANGCHAIN_TRACING_V2')}")
logger.info(f"LangSmith Project: {os.environ.get('LANGCHAIN_PROJECT')}")
logger.info(f"LangSmith API Key: {'Set' if os.environ.get('LANGCHAIN_API_KEY') else 'Not Set'}")

# Create FastAPI app
app = FastAPI(
    title="Travel Agent API",
    description="FastAPI service for LangGraph travel booking agent",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3000", 
    ],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
agent_service = AgentService()
db_manager = DatabaseManager()

@app.get("/")
async def root():
    """Service information endpoint"""
    logger.info("Service information requested")
    return {
        "service": "Travel Agent API",
        "version": "1.0.0",
        "status": "running",
        "description": "FastAPI service for LangGraph travel booking agent",
        "endpoints": {
            "chat": "/chat",
            "new_thread": "/chat/new", 
            "history": "/chat/{thread_id}/history",
            "health": "/health",
            "docs": "/docs"
        },
        "timestamp": datetime.now()
    }


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint for service monitoring
    
    Returns:
        HealthResponse with service status and component health
    """
    try:
        logger.info("Health check requested")
        
        # Perform health check through agent service
        health_response = agent_service.health_check()
        
        # Log health status
        if health_response.status == "healthy":
            logger.info("Health check passed - all systems operational")
        else:
            logger.warning(f"Health check failed - status: {health_response.status}")
        
        return health_response
        
    except Exception as e:
        logger.error(f"Health check endpoint error: {str(e)}")
        # Return unhealthy status if health check itself fails
        return HealthResponse(
            status="unhealthy",
            database_connected=False,
            agent_ready=False,
            timestamp=datetime.now()
        )

@app.post("/test/simple-chat")
async def test_simple_chat():
    """
    Simple test endpoint that simulates a basic chat interaction
    This endpoint is for testing purposes and uses a hardcoded passenger ID
    """
    try:
        logger.info("Test endpoint called")
        
        # Test with a simple message
        test_request = ChatRequest(
            message="Hi there, what time is my flight?",
            passenger_id="3442 587242",  # Using the same test passenger ID from app.py
            thread_id=None  # Let it create a new thread
        )
        
        # Process through the normal chat endpoint logic
        response = await agent_service.process_message(
            message=test_request.message,
            passenger_id=test_request.passenger_id,
            thread_id=test_request.thread_id
        )
        
        return {
            "test_status": "success",
            "request": {
                "message": test_request.message,
                "passenger_id": test_request.passenger_id
            },
            "response": response
        }
        
    except Exception as e:
        logger.error(f"Test endpoint error: {str(e)}")
        return {
            "test_status": "error",
            "error": str(e),
            "timestamp": datetime.now()
        }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Send a message to the travel agent
    
    Args:
        request: ChatRequest containing message, passenger_id, and optional thread_id
        
    Returns:
        ChatResponse with agent's response and metadata
    """
    try:
        logger.info(f"Received chat request from passenger {request.passenger_id}")
        
        # Validate passenger_id
        if not request.passenger_id or not request.passenger_id.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="passenger_id is required and cannot be empty"
            )
        
        # Validate message
        if not request.message or not request.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="message is required and cannot be empty"
            )
        
        # Process message through agent
        response = await agent_service.process_message(
            message=request.message,
            passenger_id=request.passenger_id,
            thread_id=request.thread_id
        )
        
        logger.info(f"Successfully processed message for passenger {request.passenger_id}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process message: {str(e)}"
        )

@app.post("/chat/new", response_model=ThreadResponse)
async def create_new_thread(request: NewThreadRequest = None):
    """
    Create a new conversation thread
    
    Args:
        request: Optional NewThreadRequest with initial message
        
    Returns:
        ThreadResponse with new thread_id
    """
    try:
        logger.info("Creating new conversation thread")
        
        # Create new thread
        thread_id = agent_service.create_new_thread()
        
        response = ThreadResponse(
            thread_id=thread_id,
            timestamp=datetime.now()
        )
        
        logger.info(f"Created new thread: {thread_id}")
        return response
        
    except Exception as e:
        logger.error(f"Error creating new thread: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create new thread: {str(e)}"
        )

@app.get("/chat/{thread_id}/history", response_model=HistoryResponse)
async def get_conversation_history(thread_id: str):
    """
    Get conversation history for a thread
    
    Args:
        thread_id: Thread ID to get history for
        
    Returns:
        HistoryResponse with conversation messages
    """
    try:
        logger.info(f"Retrieving conversation history for thread {thread_id}")
        
        # Validate thread_id
        if not thread_id or not thread_id.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="thread_id is required and cannot be empty"
            )
        
        # Get conversation history
        messages = await agent_service.get_conversation_history(thread_id)
        
        response = HistoryResponse(
            thread_id=thread_id,
            messages=messages,
            total_messages=len(messages)
        )
        
        logger.info(f"Retrieved {len(messages)} messages for thread {thread_id}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving conversation history: {str(e)}")
        # Check if it's a "thread not found" type error
        if "not found" in str(e).lower() or "invalid" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Thread {thread_id} not found"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to retrieve conversation history: {str(e)}"
            )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)