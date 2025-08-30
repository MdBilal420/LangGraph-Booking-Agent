# LangGraph Booking Agent - Frontend

## Overview

A modern, responsive React frontend for the LangGraph-based travel booking agent. Built with Next.js 15, TypeScript, and Tailwind CSS, this application provides an intuitive chat interface for users to interact with the AI travel assistant.

## Technology Stack

- **Next.js 15.4.1**: React framework with App Router
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Axios**: HTTP client for API communication
- **React Markdown**: Markdown rendering for AI responses

## Architecture

### Core Components

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # App-level components
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ChatContainer.tsx  # Main chat interface
│   ├── ChatHeader.tsx     # Header with branding
│   ├── ChatInput.tsx      # Message input component
│   ├── MessageList.tsx    # Message display
│   ├── MessageBubble.tsx  # Individual message component
│   ├── SuggestedQuestions.tsx # Quick action buttons
│   ├── TypingIndicator.tsx # Loading animation
│   └── ToolCallIndicator.tsx # Tool execution status
├── contexts/              # React Context providers
│   └── ChatContext.tsx    # Chat state management
├── services/              # API service layer
│   └── chatService.ts     # Backend communication
├── types/                 # TypeScript type definitions
│   ├── chat.ts           # Chat-related types
│   └── components.ts     # Component prop types
└── utils/                 # Utility functions
```

## Key Features

### 1. **Real-time Chat Interface**
- Streaming message updates
- Typing indicators
- Tool call status display
- Error handling with retry mechanisms

### 2. **State Management**
- React Context for global state
- Local storage persistence
- Thread-based conversation management
- Passenger ID configuration

### 3. **Responsive Design**
- Mobile-first approach
- Glass morphism UI design
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### 4. **User Experience**
- Suggested questions for quick start
- Message history persistence
- Loading states and animations
- Error recovery and feedback

## Component Breakdown

### ChatContainer
The main orchestrator component that:
- Manages the overall chat layout
- Handles message sending and receiving
- Displays suggested questions for new users
- Shows error states and recovery options

### ChatContext
Global state management providing:
- Message history and thread management
- Loading states and error handling
- Passenger ID configuration
- Local storage persistence

### ChatService
API communication layer with:
- RESTful API integration
- Automatic retry mechanisms
- Error handling and timeout management
- Health check capabilities

## Environment Configuration

### Required Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## API Integration

### Backend Communication

The frontend communicates with the LangGraph backend through:

- **Chat Endpoint**: `/chat` - Send messages and receive responses
- **Thread Management**: `/chat/new` - Create new conversation threads
- **History Retrieval**: `/chat/{threadId}/history` - Load conversation history
- **Health Checks**: `/health` - Service availability monitoring

### Message Flow

1. **User Input** → ChatInput component
2. **State Update** → ChatContext dispatch
3. **API Call** → ChatService.sendMessage()
4. **Response Processing** → Message parsing and display
5. **UI Update** → MessageList and TypingIndicator

## Styling & Design

### Tailwind CSS Configuration

- Custom glass morphism effects
- Responsive breakpoints
- Dark/light mode support
- Custom animations and transitions

### Design System

- **Colors**: Consistent color palette with semantic meaning
- **Typography**: Readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI patterns

## Testing

### Test Setup

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **User Event**: Interaction testing
- **Coverage**: Code coverage reporting

### Test Commands

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Performance Optimizations

### 1. **Code Splitting**
- Next.js automatic code splitting
- Dynamic imports for heavy components
- Route-based chunking

### 2. **Caching**
- Local storage for conversation persistence
- Service worker for offline support
- API response caching

### 3. **Bundle Optimization**
- Tree shaking for unused code
- Image optimization
- CSS purging

## Deployment

### Netlify Deployment

The application is configured for Netlify deployment with:

- **Build Command**: `npm run build`
- **Publish Directory**: `out/`
- **Environment Variables**: Configured in Netlify dashboard

### Build Process

```bash
# Static export for Netlify
npm run build
npm run export  # Generates static files in out/
```

## Development Guidelines

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Git commit messages

### Component Patterns

- **Functional Components**: With hooks
- **Props Interface**: TypeScript interfaces for all props
- **Error Boundaries**: Graceful error handling
- **Loading States**: Consistent loading patterns

### State Management

- **Context API**: For global state
- **Local State**: For component-specific state
- **Persistence**: Local storage for important data
- **Optimistic Updates**: For better UX

## Troubleshooting

### Common Issues

1. **API Connection**: Check `NEXT_PUBLIC_API_URL` environment variable
2. **Build Errors**: Ensure all TypeScript types are properly defined
3. **Styling Issues**: Verify Tailwind CSS configuration
4. **Performance**: Monitor bundle size and loading times

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## Contributing

1. Follow TypeScript best practices
2. Write tests for new components
3. Update documentation for API changes
4. Ensure responsive design compatibility
5. Test across different browsers and devices