# Travel Agent API - Postman Test Requests

## Setup
- Base URL: `http://localhost:8000`
- Start the server: `cd backend && uvicorn main:app --reload`

## Test Endpoints

### 1. Service Information (GET)
**URL:** `GET http://localhost:8000/`
**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
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
  "timestamp": "2025-01-15T..."
}
```

### 2. Health Check (GET)
**URL:** `GET http://localhost:8000/health`
**Headers:** None required
**Body:** None

**Expected Response:**
```json
{
  "status": "healthy",
  "database_connected": true,
  "agent_ready": true,
  "timestamp": "2025-01-15T..."
}
```

### 3. Simple Test Chat (POST) - **START HERE**
**URL:** `POST http://localhost:8000/test/simple-chat`
**Headers:** 
- `Content-Type: application/json`
**Body:** None (uses hardcoded test data)

**Expected Response:**
```json
{
  "test_status": "success",
  "request": {
    "message": "Hi there, what time is my flight?",
    "passenger_id": "3442 587242"
  },
  "response": {
    "response": "Agent response here...",
    "thread_id": "uuid-string",
    "timestamp": "2025-01-15T...",
    "tool_calls": [...]
  }
}
```

### 4. Create New Thread (POST)
**URL:** `POST http://localhost:8000/chat/new`
**Headers:** 
- `Content-Type: application/json`
**Body:** 
```json
{
  "initial_message": "Hello, I need help with my travel plans"
}
```

**Expected Response:**
```json
{
  "thread_id": "uuid-string",
  "timestamp": "2025-01-15T..."
}
```

### 5. Send Chat Message (POST)
**URL:** `POST http://localhost:8000/chat`
**Headers:** 
- `Content-Type: application/json`
**Body:** 
```json
{
  "message": "What time is my flight?",
  "passenger_id": "3442 587242",
  "thread_id": null
}
```

**Alternative with existing thread:**
```json
{
  "message": "Can I change my flight to tomorrow?",
  "passenger_id": "3442 587242",
  "thread_id": "your-thread-id-from-previous-response"
}
```

**Expected Response:**
```json
{
  "response": "Based on your booking information...",
  "thread_id": "uuid-string",
  "timestamp": "2025-01-15T...",
  "tool_calls": [
    {
      "name": "fetch_user_flight_information",
      "args": {},
      "result": null
    }
  ]
}
```

### 6. Get Conversation History (GET)
**URL:** `GET http://localhost:8000/chat/{thread_id}/history`
Replace `{thread_id}` with actual thread ID from previous responses
**Headers:** None required
**Body:** None

**Example:** `GET http://localhost:8000/chat/123e4567-e89b-12d3-a456-426614174000/history`

**Expected Response:**
```json
{
  "thread_id": "123e4567-e89b-12d3-a456-426614174000",
  "messages": [
    {
      "role": "user",
      "content": "What time is my flight?",
      "timestamp": "2025-01-15T...",
      "tool_calls": null
    },
    {
      "role": "assistant", 
      "content": "Your flight is scheduled for...",
      "timestamp": "2025-01-15T...",
      "tool_calls": [...]
    }
  ],
  "total_messages": 2
}
```

## Error Test Cases

### 7. Invalid Chat Request (Missing passenger_id)
**URL:** `POST http://localhost:8000/chat`
**Headers:** 
- `Content-Type: application/json`
**Body:** 
```json
{
  "message": "Hello"
}
```

**Expected Response (400 Error):**
```json
{
  "detail": "passenger_id is required and cannot be empty"
}
```

### 8. Invalid Thread History Request
**URL:** `GET http://localhost:8000/chat/invalid-thread-id/history`
**Headers:** None required
**Body:** None

**Expected Response (404 Error):**
```json
{
  "detail": "Thread invalid-thread-id not found"
}
```

## Sample Travel Agent Conversation Flow

### Test Sequence:
1. **Start:** `POST /test/simple-chat` (easiest test)
2. **Create Thread:** `POST /chat/new`
3. **Ask about flights:** `POST /chat` with "What flights do I have?"
4. **Ask to change flight:** `POST /chat` with "Can I change my flight to next week?"
5. **Ask about hotels:** `POST /chat` with "What hotels are available in my destination?"
6. **Get history:** `GET /chat/{thread_id}/history`

### Sample Messages to Test:
- "Hi there, what time is my flight?"
- "Am I allowed to update my flight to something sooner?"
- "What about lodging and transportation?"
- "I'd like an affordable hotel for my week-long stay"
- "What are my car rental options?"
- "What recommendations do you have on excursions?"

## Troubleshooting

### If you get import errors:
1. Make sure you're in the `backend` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Check that all files are created properly

### If the agent doesn't respond properly:
1. Check the logs in the terminal
2. Verify environment variables are set (GROQ_API_KEY, etc.)
3. Test the `/health` endpoint first

### If database errors occur:
1. The database should download automatically
2. Check internet connection for initial download
3. Look for SQLite file creation in the 