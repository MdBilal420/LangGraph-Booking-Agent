'use client';

import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';

export default function ChatContainer() {
  const { state, actions } = useChat();

  const handleQuestionSelect = (question: string) => {
    actions.sendMessage(question);
  };

  const handleSendMessage = (message: string) => {
    actions.sendMessage(message);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-4xl h-screen flex flex-col">
      {/* Chat Header */}
      <ChatHeader />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 mt-4 sm:mt-6">
        {/* Messages Container */}
        <div className="flex-1 glass-card p-4 sm:p-6 mb-4 sm:mb-6 overflow-hidden flex flex-col">
          {state.messages.length === 0 && state.showSuggestions ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  Welcome to your Travel Assistant
                </h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  I&apos;m here to help you with flights, hotels, and travel planning
                </p>
              </div>
              
              <SuggestedQuestions 
                onQuestionSelect={handleQuestionSelect}
                isVisible={state.showSuggestions}
              />
            </div>
          ) : (
            <MessageList />
          )}
        </div>
        
        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={state.isLoading}
          disabled={state.isLoading}
        />
      </div>
      
      {/* Error Display */}
      {state.error && (
        <div className="mt-4 p-3 sm:p-4 glass-card border-red-300 bg-red-50">
          <div className="flex items-start justify-between">
            <p className="text-red-600 text-sm flex-1 pr-2">{state.error}</p>
            <button
              onClick={() => actions.setError(null)}
              className="text-red-500 hover:text-red-700 flex-shrink-0 w-6 h-6 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}