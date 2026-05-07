'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
  disabled = false,
  placeholder = 'Where do you want to travel?',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [message]);

  // Focus on mount
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
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSend = message.trim().length > 0 && !disabled && !isLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        'px-4 py-4 border-t border-border',
        'bg-background/80 backdrop-blur-md'
      )}
    >
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div
          className={cn(
            'relative flex items-end gap-2 rounded-2xl border bg-card p-2 shadow-sm',
            'transition-all duration-200',
            isFocused && 'ring-2 ring-ring/50 border-ring/30 shadow-md'
          )}
        >
          {/* Textarea */}
          <div className="flex-1 min-w-0 py-2">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isLoading ? 'AI is responding...' : placeholder}
              disabled={disabled || isLoading}
              rows={1}
              className={cn(
                'w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60',
                'focus:outline-none disabled:opacity-50 focus-visible:outline-none focus-visible:black',
                'min-h-[20px] max-h-[160px]'
              )}
              aria-label="Type your message"
            />
          </div>

          {/* Voice button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-40 hidden sm:flex"
            aria-label="Voice input"
            title="Coming soon"
          >
            <Mic size={18} />
          </motion.button>

          {/* Send button */}
          <motion.button
            type="submit"
            disabled={!canSend}
            whileHover={canSend ? { scale: 1.05 } : {}}
            whileTap={canSend ? { scale: 0.95 } : {}}
            className={cn(
              'p-2.5 rounded-xl flex items-center justify-center transition-all duration-200',
              canSend
                ? 'bg-primary text-primary-foreground shadow-sm hover:shadow-md'
                : 'bg-muted text-muted-foreground/40'
            )}
            aria-label={isLoading ? 'Sending' : 'Send message'}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Loader2 size={18} className="animate-spin" />
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Send size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-muted-foreground/50 mt-2"
        >
          Press Enter to send, Shift + Enter for new line
        </motion.p>
      </form>
    </motion.div>
  );
}
