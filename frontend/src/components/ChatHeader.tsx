'use client';

import React from 'react';
import { useChat } from '@/contexts/ChatContext';

export default function ChatHeader() {
  const { actions, state } = useChat();

  const handleNewConversation = () => {
    actions.startNewConversation();
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg sm:text-xl font-bold">✈️</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Travel Assistant</h1>
            <p className="text-gray-900 text-xs sm:text-sm truncate">
              {state.currentThreadId ? 'Active conversation' : 'Ready to help with your travel needs'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleNewConversation}
          disabled={state.isLoading}
          className="glass-button px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-gray-700 text-xs sm:text-sm font-medium hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <span className="hidden sm:inline">New Chat</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
      
      {/* Connection Status */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-gray-800 text-xs">
          Connected • Passenger ID: {state.passengerId}
        </span>
      </div>
    </div>
  );
}