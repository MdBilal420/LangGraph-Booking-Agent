# LangGraph Booking Agent

> **LangGraph AI travel agent with 15+ tools for flight, hotel, car, and excursion booking using Google AI.**

A sophisticated full-stack travel booking system that combines the power of LangGraph, Google Generative AI, and modern web technologies to provide an intelligent conversational interface for comprehensive travel management.

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** for backend
- **Node.js 18+** for frontend
- **API Keys**: Google AI, Groq, Tavily, LangSmith

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LangGraph-Booking-Agent
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp env.yaml.template env.yaml
   # Edit env.yaml with your API keys
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with your backend URL
   ```

4. **Start the System**
   ```bash
   # Terminal 1: Backend
   cd backend
   python app.py
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🏗️ Architecture Overview

```
LangGraph Booking Agent
├── backend/                 # LangGraph AI Backend
│   ├── app.py              # Main LangGraph application
│   ├── agent_service.py    # FastAPI service wrapper
│   ├── database.py         # Database utilities
│   └── requirements.txt    # Python dependencies
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # State management
│   │   ├── services/       # API communication
│   │   └── types/          # TypeScript definitions
│   └── package.json        # Node.js dependencies
└── README.md              # This file
```

## 🧠 Backend: LangGraph AI Engine

### Core Technologies
- **LangGraph**: Stateful conversation management
- **Google Generative AI**: Gemini 2.5 Flash for chat completions
- **Custom Vector Store**: Semantic policy lookup
- **SQLite Database**: Travel data with automatic date sync
- **FastAPI**: RESTful API service

### Key Features
- **18+ Specialized Tools**: Flight, hotel, car rental, excursion management
- **Stateful Conversations**: Persistent memory across sessions
- **Real-time Data Sync**: Automatic timezone-aware updates
- **Error Recovery**: Graceful fallbacks and retry mechanisms
- **Business Logic Validation**: Ticket ownership, booking rules

### Database Schema
- **8 Main Tables**: flights, tickets, hotels, car_rentals, trip_recommendations
- **Hosted**: Google Cloud Storage with local caching
- **Auto-updates**: Flight dates synchronized to current time

## 🎨 Frontend: Modern React Interface

### Core Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **React Context**: State management
- **Axios**: HTTP client with retry logic

### Key Features
- **Glass Morphism UI**: Modern, futuristic design
- **Real-time Chat**: Streaming message updates
- **Responsive Design**: Mobile-first approach
- **Suggested Questions**: Quick-start interactions
- **Thread Persistence**: Conversation history across sessions

## 🔧 Configuration

### Backend Environment Variables

```yaml
# env.yaml
GROQ_API_KEY: your_groq_api_key
GOOGLE_API_KEY: your_google_api_key
TAVILY_API_KEY: your_tavily_api_key
LANGSMITH_API_KEY: your_langsmith_api_key
LANGSMITH_TRACING: true
LANGSMITH_ENDPOINT: https://api.smith.langchain.com
LANGSMITH_PROJECT: Booking-Agent-LC
```

### Frontend Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🛠️ Available Tools

### Flight Management (4 tools)
- `fetch_user_flight_information` - Get user's flight details
- `search_flights` - Search available flights
- `update_ticket_to_new_flight` - Change flight bookings
- `cancel_ticket` - Cancel flight tickets

### Hotel Management (4 tools)
- `search_hotels` - Find available hotels
- `book_hotel` - Reserve hotel rooms
- `update_hotel` - Modify hotel bookings
- `cancel_hotel` - Cancel hotel reservations

### Car Rental Management (4 tools)
- `search_car_rentals` - Find car rental options
- `book_car_rental` - Reserve vehicles
- `update_car_rental` - Modify rental details
- `cancel_car_rental` - Cancel car rentals

### Trip Recommendations (4 tools)
- `search_trip_recommendations` - Find excursions and activities
- `book_excursion` - Reserve excursions
- `update_excursion` - Modify excursion details
- `cancel_excursion` - Cancel excursions

### Information & Policy (2 tools)
- `lookup_policy` - Semantic search through company policies
- `TavilySearch` - Real-time web search for current information

## 🚀 Deployment

### Backend Deployment (Google Cloud Run)

```bash
cd backend
gcloud run deploy travel-agent-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Frontend Deployment (Netlify)

```bash
cd frontend
npm run build
# Deploy the 'out' directory to Netlify
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
npm run test:coverage
```

## 📊 Performance

### Backend Optimizations
- **Lazy Loading**: Database and retriever initialization
- **Caching**: Embeddings and database queries
- **Streaming**: Real-time response streaming
- **Error Recovery**: Automatic retry mechanisms

### Frontend Optimizations
- **Code Splitting**: Next.js automatic optimization
- **Bundle Optimization**: Tree shaking and CSS purging
- **Caching**: Local storage and service workers
- **Responsive Images**: Next.js image optimization

## 🔒 Security

### Backend Security
- **Input Validation**: SQL injection prevention
- **Authentication**: Passenger ID verification
- **API Key Protection**: Environment variable security
- **Business Logic**: Booking rule enforcement

### Frontend Security
- **TypeScript**: Type safety and validation
- **HTTPS**: Secure API communication
- **Input Sanitization**: XSS prevention
- **Error Handling**: Graceful error recovery

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify backend is running on correct port
   - Check environment variables
   - Ensure CORS is properly configured

2. **Database Issues**
   - Check database URL accessibility
   - Verify SQLite file permissions
   - Monitor disk space for caching

3. **Tool Execution Errors**
   - Verify passenger ID configuration
   - Check API key validity
   - Review error logs for details

### Debug Mode

```bash
# Backend
LANGSMITH_TRACING=true python app.py

# Frontend
NODE_ENV=development npm run dev
```

## 📈 Monitoring

### LangSmith Integration
- **Conversation Tracing**: Full conversation flow
- **Tool Execution**: Performance monitoring
- **Error Tracking**: Automatic error reporting
- **Analytics**: Usage patterns and insights

### Health Checks
- **Backend**: `/health` endpoint
- **Frontend**: Service availability monitoring
- **Database**: Connection status checks

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Follow coding standards**
   - TypeScript for frontend
   - Python type hints for backend
   - Comprehensive testing
4. **Submit a pull request**

### Development Guidelines
- Write tests for new features
- Update documentation
- Follow existing code patterns
- Ensure responsive design
- Test across browsers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **LangGraph Team**: For the powerful conversation framework
- **Google AI**: For the Gemini model integration
- **Next.js Team**: For the excellent React framework
- **Tailwind CSS**: For the utility-first CSS framework

---

**Built with ❤️ using LangGraph, Google AI, and modern web technologies**
