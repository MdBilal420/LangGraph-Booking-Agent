import { ReactNode } from 'react';
import { ChatMessage, ToolCall } from './chat';

export interface MessageBubbleProps {
  message: ChatMessage;
  isLatest?: boolean;
}

export interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isVisible: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface TypingIndicatorProps {
  isVisible: boolean;
}

export interface ToolCallIndicatorProps {
  toolCalls: ToolCall[];
  isVisible: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'user' | 'assistant';
}