# Design Document

## Overview

The Next.js Travel Chatbot UI is a modern, glassmorphic interface that provides an intuitive chat experience for travelers. The application features a futuristic design with glass-like transparency effects, smooth animations, and responsive layouts. It integrates seamlessly with the existing FastAPI travel agent backend to deliver real-time travel assistance.

## Architecture

### Frontend Architecture
- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom glassmorphic utilities
- **State Management**: React Context API for chat state and thread management
- **HTTP Client**: Axios for API communication with proper error handling
- **Real-time Features**: Polling for message updates and typing indicators

### Component Hierarchy
```
App
├── Layout (glassmorphic background, responsive container)
├── ChatContainer
│   ├── ChatHeader (title, new conversation button)
│   ├── MessageList
│   │   ├── MessageBubble (user/assistant variants)
│   │   ├── TypingIndicator
│   │   └── ToolCallIndicator
│   ├── SuggestedQuestions (collapsible)
│   └── ChatInput (message input, send button)
└── ErrorBoundary (global error handling)
```

## Components and Interfaces

### Core Components

#### ChatContainer
- Main chat interface container with glassmorphic styling
- Manages chat state, thread management, and API communication
- Handles message sending, receiving, and error states
- Implements auto-scroll to latest messages

#### MessageBubble
- Displays individual chat messages with role-based styling
- User messages: Right-aligned with blue glassmorphic background
- Assistant messages: Left-aligned with purple/teal glassmorphic background
- Includes timestamp, tool call indicators, and animation effects

#### SuggestedQuestions
- Grid layout of clickable question cards
- Glassmorphic styling with hover effects
- Automatically hides when conversation starts
- Questions include:
  - "What time is my flight?"
  - "Can I change my flight to next week?"
  - "What hotels are available at my destination?"
  - "What are my car rental options?"
  - "What recommendations do you have for excursions?"
  - "What about lodging and transportation?"

#### ChatInput
- Text input with glassmorphic styling
- Send button with loading states
- Auto-resize textarea for longer messages
- Enter key submission with Shift+Enter for new lines

### API Integration Layer

#### ChatService
```typescript
interface ChatService {
  sendMessage(message: string, threadId?: string): Promise<ChatResponse>
  createNewThread(initialMessage?: string): Promise<ThreadResponse>
  getConversationHistory(threadId: string): Promise<HistoryResponse>
  checkHealth(): Promise<HealthResponse>
}
```

#### Type Definitions
```typescript
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  tool_calls?: ToolCall[]
}

interface ChatResponse {
  response: string
  thread_id: string
  timestamp: string
  tool_calls: ToolCall[]
}

interface ToolCall {
  name: string
  args: Record<string, any>
  result: any
}
```

## Data Models

### Chat State Management
```typescript
interface ChatState {
  messages: ChatMessage[]
  currentThreadId: string | null
  isLoading: boolean
  error: string | null
  passengerId: string
  showSuggestions: boolean
}

interface ChatActions {
  sendMessage: (message: string) => Promise<void>
  startNewConversation: () => Promise<void>
  setError: (error: string | null) => void
  clearMessages: () => void
}
```

### Local Storage Schema
- `travel-chat-thread-id`: Current thread ID
- `travel-chat-passenger-id`: Passenger ID (default: "3442 587242")
- `travel-chat-messages`: Cached messages for offline viewing

## Error Handling

### Error Types and Responses
1. **Network Errors**: Display retry button with connection status
2. **API Errors**: Show specific error messages from backend
3. **Validation Errors**: Highlight input fields with error states
4. **Thread Not Found**: Automatically create new thread
5. **Rate Limiting**: Show cooldown timer and retry options

### Error UI Components
- Toast notifications for temporary errors
- Inline error messages for form validation
- Fallback UI for component errors
- Offline indicator with cached message viewing

## Testing Strategy

### Unit Testing
- Component rendering and prop handling
- API service functions and error scenarios
- State management and context providers
- Utility functions for message formatting

### Integration Testing
- API communication with mock backend
- User interaction flows (send message, new thread)
- Error handling and recovery scenarios
- Responsive design across device sizes

### E2E Testing
- Complete conversation flows
- Suggested question interactions
- Thread persistence across page refreshes
- Error recovery and retry mechanisms

## Design System

### Glassmorphic Theme
```css
/* Primary glassmorphic card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Message bubbles */
.glass-user {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
}

.glass-assistant {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3));
}
```

### Color Palette
- Primary: Blue gradient (#3B82F6 to #9333EA)
- Secondary: Teal to blue (#10B981 to #3B82F6)
- Background: Dark gradient with subtle patterns
- Text: White with varying opacity levels
- Accents: Cyan highlights for interactive elements

### Typography
- Primary: Inter font family
- Headings: Font weight 600-700
- Body text: Font weight 400-500
- Code/technical: Monospace font for tool calls

### Animations
- Message appearance: Slide up with fade in
- Typing indicator: Pulsing dots animation
- Button interactions: Scale and glow effects
- Page transitions: Smooth fade transitions
- Loading states: Shimmer effects on glassmorphic elements

## Performance Considerations

### Optimization Strategies
- Message virtualization for long conversations
- Debounced API calls for typing indicators
- Image lazy loading for any media content
- Code splitting for non-critical components
- Service worker for offline message caching

### Bundle Size Management
- Tree shaking for unused Tailwind classes
- Dynamic imports for heavy dependencies
- Optimized build configuration
- Compression and minification

## Accessibility

### WCAG Compliance
- Keyboard navigation for all interactive elements
- Screen reader support with proper ARIA labels
- High contrast mode compatibility
- Focus indicators on glassmorphic elements
- Alternative text for visual indicators

### Responsive Design Breakpoints
- Mobile: 320px - 768px (single column, full-width input)
- Tablet: 768px - 1024px (optimized touch targets)
- Desktop: 1024px+ (multi-column layout options)

## Security Considerations

### Data Protection
- No sensitive data stored in localStorage
- API keys handled server-side only
- Input sanitization for user messages
- HTTPS enforcement for API communication
- Content Security Policy headers