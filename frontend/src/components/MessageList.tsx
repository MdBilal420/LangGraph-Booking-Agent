'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Compass } from 'lucide-react';

export default function MessageList() {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: hasScrolled.current ? 'smooth' : 'auto',
        block: 'end',
      });
      hasScrolled.current = true;
    }
  }, [state.messages, state.isTyping]);

  if (state.messages.length === 0 && !state.isTyping) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center"
          >
            <Compass size={28} className="text-primary" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground"
          >
            Start a conversation to plan your trip
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scroll-smooth max-w-3xl mx-auto w-full"
      style={{ scrollbarGutter: 'stable' }}
    >
      <AnimatePresence mode="popLayout">
        {state.messages.map((message, index) => (
          <MessageBubble
            key={`${message.timestamp}-${index}`}
            message={message}
            isLatest={index === state.messages.length - 1}
          />
        ))}
      </AnimatePresence>

      <TypingIndicator isVisible={state.isTyping} />

      <div ref={messagesEndRef} className="h-2" />
    </div>
  );
}
