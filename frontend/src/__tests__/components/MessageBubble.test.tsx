import { render, screen } from '@testing-library/react'
import MessageBubble from '@/components/MessageBubble'
import { ChatMessage } from '@/types/chat'

const mockUserMessage: ChatMessage = {
  role: 'user',
  content: 'Hello, what time is my flight?',
  timestamp: '2025-01-15T10:30:00Z',
}

const mockAssistantMessage: ChatMessage = {
  role: 'assistant',
  content: 'Your flight is scheduled for 2:30 PM today.',
  timestamp: '2025-01-15T10:31:00Z',
  tool_calls: [
    {
      name: 'fetch_user_flight_information',
      args: {},
      result: 'Flight found',
    },
  ],
}

describe('MessageBubble', () => {
  it('renders user message correctly', () => {
    render(<MessageBubble message={mockUserMessage} />)
    
    expect(screen.getByText('Hello, what time is my flight?')).toBeInTheDocument()
    expect(screen.getByText('You')).toBeInTheDocument()
    expect(screen.getByText('10:30')).toBeInTheDocument()
  })

  it('renders assistant message correctly', () => {
    render(<MessageBubble message={mockAssistantMessage} />)
    
    expect(screen.getByText('Your flight is scheduled for 2:30 PM today.')).toBeInTheDocument()
    expect(screen.getByText('Travel Assistant')).toBeInTheDocument()
    expect(screen.getByText('10:31')).toBeInTheDocument()
  })

  it('shows tool calls when present', () => {
    render(<MessageBubble message={mockAssistantMessage} />)
    
    expect(screen.getByText('Used 1 tool')).toBeInTheDocument()
  })

  it('applies correct styling for user messages', () => {
    const { container } = render(<MessageBubble message={mockUserMessage} />)
    
    const messageBubble = container.querySelector('.glass-user')
    expect(messageBubble).toBeInTheDocument()
  })

  it('applies correct styling for assistant messages', () => {
    const { container } = render(<MessageBubble message={mockAssistantMessage} />)
    
    const messageBubble = container.querySelector('.glass-assistant')
    expect(messageBubble).toBeInTheDocument()
  })
})