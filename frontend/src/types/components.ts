import { ReactNode } from 'react';
import { ChatMessage, ToolCall, ChatThread } from './chat';

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
  placeholder?: string;
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

export interface SidebarProps {
  threads: ChatThread[];
  currentThreadId: string | null;
  onNewChat: () => void;
  onSelectThread: (threadId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  passengerId: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  imageColor: string;
  tags: string[];
  temperature: number;
  saved?: boolean;
  onSave?: (id: string) => void;
}

export interface FlightCardProps {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  status: 'cheapest' | 'fastest' | 'recommended' | null;
  saved?: boolean;
  onSave?: (id: string) => void;
}

export interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  rating: number;
  reviews: number;
  imageColor: string;
  saved?: boolean;
  onSave?: (id: string) => void;
}

export interface ItineraryTimelineProps {
  days: {
    day: number;
    date: string;
    activities: {
      time: string;
      title: string;
      location: string;
      type: 'flight' | 'hotel' | 'activity' | 'food' | 'transport';
      description?: string;
    }[];
  }[];
}