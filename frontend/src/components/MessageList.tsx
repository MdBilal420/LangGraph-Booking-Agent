'use client';

import React, { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function MessageList() {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [state.messages, state.isTyping]);

  // Handle scroll to top for loading more messages (future enhancement)
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      // Future: Load more messages when scrolled to top
      if (scrollTop === 0) {
        // console.log('Reached top - could load more messages');
      }
    }
  };

  if (state.messages.length === 0 && !state.isTyping) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white/60">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-lg">No messages yet</p>
          <p className="text-sm mt-1">Start a conversation to see messages here</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto pr-2 space-y-1"
      onScroll={handleScroll}
      style={{ scrollbarGutter: 'stable' }}
    >
      {/* Messages */}
      {state.messages.map((message, index) => (
        <MessageBubble
          key={`${message.timestamp}-${index}`}
          message={message}
          isLatest={index === state.messages.length - 1}
        />
      ))}
      
      {/* Typing Indicator */}
      <TypingIndicator isVisible={state.isTyping} />
      
      {/* Scroll anchor */}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}