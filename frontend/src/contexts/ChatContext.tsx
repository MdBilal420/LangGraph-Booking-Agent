'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ChatState, ChatActions, ChatMessage } from '@/types/chat';
import { chatService } from '@/services/chatService';

// Initial state
const initialState: ChatState = {
  messages: [],
  currentThreadId: null,
  isLoading: false,
  error: null,
  passengerId: '3442 587242', // Fixed passenger ID as requested
  showSuggestions: true,
  isTyping: false,
};

// Action types
type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_THREAD_ID'; payload: string | null }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_SHOW_SUGGESTIONS'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_PASSENGER_ID'; payload: string };

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_THREAD_ID':
      return { ...state, currentThreadId: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'SET_SHOW_SUGGESTIONS':
      return { ...state, showSuggestions: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [], showSuggestions: true };
    case 'SET_PASSENGER_ID':
      return { ...state, passengerId: action.payload };
    default:
      return state;
  }
}

// Context
const ChatContext = createContext<{
  state: ChatState;
  actions: ChatActions;
} | null>(null);

// Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem('travel-chat-thread-id');
    const savedPassengerId = localStorage.getItem('travel-chat-passenger-id');
    const savedMessages = localStorage.getItem('travel-chat-messages');

    if (savedThreadId) {
      dispatch({ type: 'SET_THREAD_ID', payload: savedThreadId });
    }

    if (savedPassengerId) {
      dispatch({ type: 'SET_PASSENGER_ID', payload: savedPassengerId });
    }

    if (savedMessages) {
      try {
        const messages = JSON.parse(savedMessages);
        dispatch({ type: 'SET_MESSAGES', payload: messages });
        if (messages.length > 0) {
          dispatch({ type: 'SET_SHOW_SUGGESTIONS', payload: false });
        }
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Persist data when state changes
  useEffect(() => {
    if (state.currentThreadId) {
      localStorage.setItem('travel-chat-thread-id', state.currentThreadId);
    } else {
      localStorage.removeItem('travel-chat-thread-id');
    }
  }, [state.currentThreadId]);

  useEffect(() => {
    localStorage.setItem('travel-chat-passenger-id', state.passengerId);
  }, [state.passengerId]);

  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem('travel-chat-messages', JSON.stringify(state.messages));
    } else {
      localStorage.removeItem('travel-chat-messages');
    }
  }, [state.messages]);

  // Actions
  const actions: ChatActions = {
    sendMessage: async (message: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        dispatch({ type: 'SET_TYPING', payload: true });

        // Add user message immediately
        const userMessage: ChatMessage = {
          role: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

        // Hide suggestions after first message
        if (state.showSuggestions) {
          dispatch({ type: 'SET_SHOW_SUGGESTIONS', payload: false });
        }

        // Send message to API
        const response = await chatService.sendMessage(
          message,
          state.passengerId,
          state.currentThreadId
        );

        // Update thread ID if new
        if (response.thread_id !== state.currentThreadId) {
          dispatch({ type: 'SET_THREAD_ID', payload: response.thread_id });
        }

        // Add assistant message
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.response,
          timestamp: response.timestamp,
          tool_calls: response.tool_calls,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_TYPING', payload: false });
      }
    },

    startNewConversation: async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        // Clear current state
        dispatch({ type: 'CLEAR_MESSAGES' });
        dispatch({ type: 'SET_THREAD_ID', payload: null });

        // Create new thread
        const response = await chatService.createNewThread();
        dispatch({ type: 'SET_THREAD_ID', payload: response.thread_id });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to start new conversation';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    setError: (error: string | null) => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },

    clearMessages: () => {
      dispatch({ type: 'CLEAR_MESSAGES' });
      dispatch({ type: 'SET_THREAD_ID', payload: null });
    },

    setIsTyping: (typing: boolean) => {
      dispatch({ type: 'SET_TYPING', payload: typing });
    },

    hideSuggestions: () => {
      dispatch({ type: 'SET_SHOW_SUGGESTIONS', payload: false });
    },

    showSuggestions: () => {
      dispatch({ type: 'SET_SHOW_SUGGESTIONS', payload: true });
    },
  };

  return (
    <ChatContext.Provider value={{ state, actions }}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook to use chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}