'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatInputProps } from '@/types/components';

export default function ChatInput({ onSendMessage, isLoading, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const isDisabled = disabled || isLoading;
  const canSend = message.trim().length > 0 && !isDisabled;

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4">
      <div className="flex items-end space-x-4">
        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "Sending..." : "Type your message here..."}
            disabled={isDisabled}
            rows={1}
            className="w-full glass-input rounded-xl px-4 py-3 text-gray-900 placeholder-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Type your message"
            aria-describedby="input-help"
            style={{
              minHeight: '48px',
              maxHeight: '120px'
            }}
          />

          {/* Character count (optional) */}
          {message.length > 100 && (
            <div className="absolute bottom-1 right-2 text-xs text-gray-700">
              {message.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!canSend}
          aria-label={isLoading ? "Sending message" : "Send message"}
          className={`
            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50
            ${canSend
              ? 'glass-button hover:scale-105 transform'
              : 'bg-white/5 border border-white/10 cursor-not-allowed opacity-50'
            }
          `}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
          ) : (
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Help Text */}
      <div id="input-help" className="mt-2 flex items-center justify-between text-xs text-gray-700">
        <span>Press Enter to send, Shift+Enter for new line</span>
        {isLoading && (
          <span className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Processing...</span>
          </span>
        )}
      </div>
    </form>
  );
}