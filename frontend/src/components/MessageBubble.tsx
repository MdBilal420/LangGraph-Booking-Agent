'use client';

import React from 'react';
import { MessageBubbleProps } from '@/types/components';
import ToolCallIndicator from './ToolCallIndicator';

export default function MessageBubble({ message, isLatest = false }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center mr-2">
              <span className="text-white text-sm">🤖</span>
            </div>
            <span className="text-gray-800 text-xs">Travel Assistant</span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div
          className={`
            p-4 rounded-2xl shadow-lg
            ${isUser 
              ? 'glass-user rounded-br-md ml-4' 
              : 'glass-assistant rounded-bl-md mr-4'
            }
            ${isLatest ? 'animate-fade-in' : ''}
          `}
        >
          {/* Message Content */}
          <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          
          {/* Tool Calls */}
          {message.tool_calls && message.tool_calls.length > 0 && (
            <ToolCallIndicator 
              toolCalls={message.tool_calls} 
              isVisible={true}
            />
          )}
          
          {/* Timestamp */}
          <div className={`mt-2 text-xs text-gray-700 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        </div>
        
        {/* User Avatar */}
        {isUser && (
          <div className="flex items-center justify-end mt-2">
            <span className="text-gray-600 text-xs mr-2">You</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}