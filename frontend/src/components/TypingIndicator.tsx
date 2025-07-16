'use client';

import React from 'react';
import { TypingIndicatorProps } from '@/types/components';

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="max-w-[80%]">
        {/* Avatar */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center mr-2">
            <span className="text-white text-sm">🤖</span>
          </div>
          <span className="text-white/60 text-xs">Travel Assistant is typing...</span>
        </div>
        
        {/* Typing Bubble */}
        <div className="glass-assistant rounded-bl-md mr-4 p-4 rounded-2xl shadow-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full typing-dot"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}