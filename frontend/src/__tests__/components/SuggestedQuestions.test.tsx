import { render, screen, fireEvent } from '@testing-library/react'
import SuggestedQuestions from '@/components/SuggestedQuestions'

const mockOnQuestionSelect = jest.fn()

describe('SuggestedQuestions', () => {
  beforeEach(() => {
    mockOnQuestionSelect.mockClear()
  })

  it('renders suggested questions when visible', () => {
    render(
      <SuggestedQuestions 
        onQuestionSelect={mockOnQuestionSelect} 
        isVisible={true} 
      />
    )
    
    expect(screen.getByText('Popular questions to get you started:')).toBeInTheDocument()
    expect(screen.getByText('What time is my flight?')).toBeInTheDocument()
    expect(screen.getByText('Can I change my flight to next week?')).toBeInTheDocument()
    expect(screen.getByText('What hotels are available at my destination?')).toBeInTheDocument()
  })

  it('does not render when not visible', () => {
    render(
      <SuggestedQuestions 
        onQuestionSelect={mockOnQuestionSelect} 
        isVisible={false} 
      />
    )
    
    expect(screen.queryByText('Popular questions to get you started:')).not.toBeInTheDocument()
  })

  it('calls onQuestionSelect when a question is clicked', () => {
    render(
      <SuggestedQuestions 
        onQuestionSelect={mockOnQuestionSelect} 
        isVisible={true} 
      />
    )
    
    const questionButton = screen.getByText('What time is my flight?')
    fireEvent.click(questionButton)
    
    expect(mockOnQuestionSelect).toHaveBeenCalledWith('What time is my flight?')
  })

  it('has proper accessibility attributes', () => {
    render(
      <SuggestedQuestions 
        onQuestionSelect={mockOnQuestionSelect} 
        isVisible={true} 
      />
    )
    
    const questionButton = screen.getByLabelText('Ask: What time is my flight?')
    expect(questionButton).toBeInTheDocument()
  })

  it('renders all expected question categories', () => {
    render(
      <SuggestedQuestions 
        onQuestionSelect={mockOnQuestionSelect} 
        isVisible={true} 
      />
    )
    
    expect(screen.getByText('Flight Info')).toBeInTheDocument()
    expect(screen.getByText('Flight Changes')).toBeInTheDocument()
    expect(screen.getByText('Hotels')).toBeInTheDocument()
    expect(screen.getByText('Transportation')).toBeInTheDocument()
    expect(screen.getByText('Activities')).toBeInTheDocument()
    expect(screen.getByText('Travel Planning')).toBeInTheDocument()
  })
})