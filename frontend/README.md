# Travel Agent - Glassmorphic Chatbot UI

A modern, futuristic chatbot interface built with Next.js that connects to the FastAPI travel agent backend. Features a beautiful glassmorphic design with smooth animations and responsive layouts.

## Features

- 🎨 **Glassmorphic Design**: Modern glass-like UI with transparency effects
- 🚀 **Futuristic Aesthetics**: Blue/purple/teal gradients with floating particles
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 💬 **Real-time Chat**: Smooth messaging with typing indicators
- 🎯 **Suggested Questions**: Quick-start options for common travel queries
- 🔄 **Thread Persistence**: Conversations saved across browser sessions
- ♿ **Accessibility**: WCAG compliant with keyboard navigation
- 🧪 **Comprehensive Testing**: Unit and integration tests included

## Quick Start

### Prerequisites

- Node.js 18+ installed
- FastAPI backend running on `http://localhost:8000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # .env.local is already configured with:
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Usage

### Basic Chat Flow

1. **Welcome Screen**: Shows suggested questions when you first visit
2. **Ask Questions**: Click suggested questions or type your own
3. **View Responses**: See agent responses with tool call indicators
4. **Continue Conversation**: Messages persist in the current thread
5. **New Chat**: Click "New Chat" to start a fresh conversation

### Suggested Questions

The interface includes pre-configured questions for common travel scenarios:

- "What time is my flight?"
- "Can I change my flight to next week?"
- "What hotels are available at my destination?"
- "What are my car rental options?"
- "What recommendations do you have for excursions?"
- "What about lodging and transportation?"

### Passenger ID

The app uses a fixed passenger ID (`3442 587242`) as specified in the requirements. This is automatically included in all API requests.

## Architecture

### Component Structure

```
src/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── ChatContainer.tsx  # Main chat interface
│   ├── ChatHeader.tsx     # Header with title and controls
│   ├── MessageList.tsx    # Message display area
│   ├── MessageBubble.tsx  # Individual message component
│   ├── SuggestedQuestions.tsx # Question cards
│   ├── ChatInput.tsx      # Message input field
│   ├── TypingIndicator.tsx # Typing animation
│   ├── ToolCallIndicator.tsx # Tool usage display
│   └── ErrorBoundary.tsx  # Error handling
├── contexts/              # React Context providers
│   └── ChatContext.tsx    # Chat state management
├── services/              # API communication
│   └── chatService.ts     # Backend integration
├── types/                 # TypeScript definitions
│   ├── chat.ts           # Chat-related types
│   └── components.ts     # Component prop types
└── __tests__/            # Test files
```

### State Management

The app uses React Context for state management with the following features:

- **Message History**: Stores all chat messages
- **Thread Management**: Handles conversation threads
- **Loading States**: Manages UI loading indicators
- **Error Handling**: Centralized error state
- **Persistence**: Saves state to localStorage

### API Integration

The `chatService` handles all backend communication:

- **Send Messages**: POST to `/chat` endpoint
- **Create Threads**: POST to `/chat/new` endpoint
- **Get History**: GET from `/chat/{thread_id}/history`
- **Health Checks**: GET from `/health` endpoint
- **Error Handling**: Automatic retry and error parsing

## Styling

### Glassmorphic Design System

The app uses custom Tailwind CSS utilities for glassmorphic effects:

- `.glass-card` - Basic glass container
- `.glass-user` - User message styling (blue gradient)
- `.glass-assistant` - Assistant message styling (emerald/blue gradient)
- `.glass-input` - Input field styling
- `.glass-button` - Button styling
- `.glass-suggestion` - Suggestion card styling

### Responsive Breakpoints

- **Mobile**: 320px - 768px (single column, touch-optimized)
- **Tablet**: 768px - 1024px (optimized touch targets)
- **Desktop**: 1024px+ (full feature set)

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Test Coverage

- **Components**: MessageBubble, SuggestedQuestions
- **Services**: ChatService API methods
- **Integration**: Full chat flow testing

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

For production deployment, set:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Ensure FastAPI backend is running on port 8000
   - Check CORS settings in backend
   - Verify API URL in environment variables

2. **Build Errors**
   - Run `npm run lint` to check for code issues
   - Ensure all TypeScript types are properly defined
   - Check for missing dependencies

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Ensure glassmorphic utilities are loaded

### Performance Tips

- The app includes automatic code splitting
- Images are optimized with Next.js Image component
- Bundle size is optimized with tree shaking
- Service worker caching is available for offline support

## Contributing

1. Follow the existing code style and patterns
2. Add tests for new components and features
3. Ensure accessibility compliance
4. Test on multiple devices and browsers
5. Update documentation for new features

## License

This project is part of the Travel Agent system and follows the same licensing terms.