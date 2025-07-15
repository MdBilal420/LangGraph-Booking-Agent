from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict
from datetime import datetime

class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    message: str = Field(..., description="User message to send to the agent")
    passenger_id: str = Field(..., description="Passenger ID for the user")
    thread_id: Optional[str] = Field(None, description="Optional thread ID for conversation continuity")

class ToolCall(BaseModel):
    """Model for tool call information"""
    name: str = Field(..., description="Name of the tool called")
    args: Dict[str, Any] = Field(..., description="Arguments passed to the tool")
    result: Optional[str] = Field(None, description="Result of the tool call")

class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    response: str = Field(..., description="Agent's response message")
    thread_id: str = Field(..., description="Thread ID for the conversation")
    timestamp: datetime = Field(..., description="Timestamp of the response")
    tool_calls: Optional[List[ToolCall]] = Field(None, description="List of tool calls made during processing")

class NewThreadRequest(BaseModel):
    """Request model for creating a new thread"""
    initial_message: Optional[str] = Field(None, description="Optional initial message for the new thread")

class ThreadResponse(BaseModel):
    """Response model for new thread creation"""
    thread_id: str = Field(..., description="Generated thread ID")
    timestamp: datetime = Field(..., description="Thread creation timestamp")

class Message(BaseModel):
    """Model for individual conversation messages"""
    role: str = Field(..., description="Role of the message sender (user/assistant)")
    content: str = Field(..., description="Message content")
    timestamp: datetime = Field(..., description="Message timestamp")
    tool_calls: Optional[List[ToolCall]] = Field(None, description="Tool calls associated with the message")

class HistoryResponse(BaseModel):
    """Response model for conversation history"""
    thread_id: str = Field(..., description="Thread ID for the conversation")
    messages: List[Message] = Field(..., description="List of conversation messages")
    total_messages: int = Field(..., description="Total number of messages in the conversation")

class HealthResponse(BaseModel):
    """Response model for health check endpoint"""
    status: str = Field(..., description="Overall service status")
    database_connected: bool = Field(..., description="Database connectivity status")
    agent_ready: bool = Field(..., description="Agent readiness status")
    timestamp: datetime = Field(..., description="Health check timestamp")

class ErrorResponse(BaseModel):
    """Response model for error responses"""
    error: str = Field(..., description="Error type or category")
    message: str = Field(..., description="Detailed error message")
    timestamp: datetime = Field(..., description="Error timestamp")
    request_id: Optional[str] = Field(None, description="Request ID for tracking")