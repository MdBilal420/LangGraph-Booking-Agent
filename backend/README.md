# LangGraph Booking Agent - Backend

## Overview

This is a sophisticated travel booking agent built with LangGraph that provides comprehensive travel assistance including flight booking, car rentals, hotel reservations, and trip recommendations. The agent uses a conversational AI approach with tool-based interactions to help users manage their travel arrangements.

## Architecture

### Core Components

- **LangGraph State Machine**: Manages conversation flow and state persistence
- **SQLite Database**: Stores travel data (flights, hotels, car rentals, trip recommendations)
- **Vector Store Retriever**: Provides semantic search for company policies and FAQs
- **Tool-based AI**: Uses function calling to interact with the database and external services

### Key Technologies

- **LangGraph**: For building stateful, multi-step AI applications
- **Google Generative AI**: For embeddings and chat completions
- **Tavily Search**: For real-time information retrieval
- **SQLite**: Local database for travel data
- **Pandas**: Data manipulation and date updates

## Environment Setup

### Required Environment Variables

```bash
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_PROJECT=Booking-Agent-LC
```

### Installation

```bash
pip install -r requirements.txt
```

## Database Schema

The application uses a SQLite database hosted at:
```
https://storage.googleapis.com/travel_agent_db/travel2_updated.sqlite
```

### Database Details

The database is automatically downloaded and cached locally on first use. It contains comprehensive travel data for the Swiss Airlines booking system demo.

### Main Tables

- **flights**: Flight information including departure/arrival times, airports, flight numbers, and status
- **tickets**: Passenger ticket information with booking references and passenger IDs
- **ticket_flights**: Ticket-to-flight mappings and fare conditions
- **boarding_passes**: Seat assignments and boarding pass information
- **hotels**: Hotel listings with location, price tiers, availability, and booking status
- **car_rentals**: Car rental options with location, pricing, and availability
- **trip_recommendations**: Excursion and activity suggestions with keywords and booking status
- **bookings**: Booking reference information and dates

### Database Features

- **Automatic Date Updates**: Flight dates are automatically updated to be current relative to the current time
- **Local Caching**: Database is cached locally after first download for faster subsequent access
- **Backup System**: Maintains backup copies for data integrity
- **Real-time Availability**: Reflects current booking status for hotels, car rentals, and excursions

## Available Tools

### Flight Management

1. **`fetch_user_flight_information`**
   - Retrieves all tickets and flight details for the current user
   - Returns ticket numbers, flight details, and seat assignments

2. **`search_flights`**
   - Search flights by departure/arrival airports and time ranges
   - Supports flexible date/time filtering

3. **`update_ticket_to_new_flight`**
   - Changes a user's ticket to a different flight
   - Includes business logic validation (3-hour minimum advance booking)

4. **`cancel_ticket`**
   - Cancels a user's ticket
   - Validates ticket ownership

### Car Rental Management

1. **`search_car_rentals`**
   - Find car rentals by location, company, and price tier
   - Supports date range filtering

2. **`book_car_rental`**
   - Reserve a car rental by ID

3. **`update_car_rental`**
   - Modify rental dates

4. **`cancel_car_rental`**
   - Cancel a car rental reservation

### Hotel Management

1. **`search_hotels`**
   - Find hotels by location, name, and price tier
   - Supports check-in/check-out date filtering

2. **`book_hotel`**
   - Reserve a hotel by ID

3. **`update_hotel`**
   - Modify hotel reservation dates

4. **`cancel_hotel`**
   - Cancel a hotel reservation

### Trip Recommendations

1. **`search_trip_recommendations`**
   - Find excursions and activities by location and keywords

2. **`book_excursion`**
   - Reserve an excursion by recommendation ID

3. **`update_excursion`**
   - Modify excursion details

4. **`cancel_excursion`**
   - Cancel an excursion booking

### Policy and Information

1. **`lookup_policy`**
   - Semantic search through company policies and FAQs
   - Uses vector embeddings for relevant policy retrieval

2. **`TavilySearch`**
   - Real-time web search for current information

## Usage Examples

### Basic Conversation Flow

```python
from app import part_1_graph
import uuid

# Initialize conversation
thread_id = str(uuid.uuid4())
config = {
    "configurable": {
        "passenger_id": "3442 587242",
        "thread_id": thread_id,
    }
}

# Start conversation
events = part_1_graph.stream(
    {"messages": ("user", "What time is my flight?")}, 
    config, 
    stream_mode="values"
)
```

### Example User Interactions

The agent can handle complex multi-step conversations:

1. **Flight Information**: "What time is my flight?"
2. **Flight Changes**: "Can I update my flight to something sooner?"
3. **Hotel Booking**: "I need an affordable hotel for my week-long stay"
4. **Car Rental**: "What are my car rental options?"
5. **Excursions**: "What recommendations do you have for excursions?"

## Key Features

### State Management
- Persistent conversation state using LangGraph checkpoints
- User context preservation across multiple interactions
- Thread-based conversation isolation

### Error Handling
- Tool execution error recovery
- Graceful fallbacks for failed operations
- User-friendly error messages

### Business Logic Validation
- Ticket ownership verification
- Minimum advance booking requirements (3 hours for flights)
- Availability checking before bookings

### Lazy Loading
- Database and retriever initialization only when needed
- Efficient resource management
- Cached embeddings for policy lookup

## Development

### Adding New Tools

1. Define the tool function with the `@tool` decorator
2. Add proper error handling and validation
3. Include the tool in the `part_1_tools` list
4. Update the assistant prompt if needed

### Database Updates

The application automatically updates flight dates to be current:

```python
def update_dates(file):
    # Updates all flight dates to be relative to current time
    # Ensures the demo data is always relevant
```

### Testing

Run the tutorial conversation:

```bash
python app.py
```

This will execute a predefined conversation flow demonstrating all major features.

## API Integration

The backend is designed to work with the frontend React application, providing:

- Real-time conversation streaming
- Tool call indicators
- Error handling and recovery
- Persistent conversation state

## Security Considerations

- Passenger ID validation for all ticket operations
- Input sanitization for database queries
- Environment variable protection for API keys
- No sensitive data logging

## Performance Optimizations

- Lazy loading of heavy components
- Cached embeddings for policy lookup
- Efficient SQL queries with proper indexing
- Streaming responses for better UX

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**: Ensure all required API keys are set
2. **Database Connection**: Check if the SQLite file is accessible
3. **Tool Execution Errors**: Verify passenger ID configuration
4. **Memory Issues**: Monitor LangGraph checkpoint storage

### Debug Mode

Enable detailed logging by setting:
```bash
LANGSMITH_TRACING=true
```

This will provide comprehensive tracing of the conversation flow and tool executions.
