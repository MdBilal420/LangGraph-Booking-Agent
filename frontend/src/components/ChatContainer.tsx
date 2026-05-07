'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/contexts/ChatContext';
import MessageList from './MessageList';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function ChatContainer() {
  const { state, actions } = useChat();

  const handleQuestionSelect = (question: string) => {
    actions.sendMessage(question);
  };

  const handleSendMessage = (message: string) => {
    actions.sendMessage(message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 min-h-0 flex flex-col">
        {state.messages.length === 0 && state.showSuggestions ? (
          <div className="h-full flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto w-full">
            <SuggestedQuestions
              onQuestionSelect={handleQuestionSelect}
              isVisible={state.showSuggestions}
            />
          </div>
        ) : (
          <MessageList />
        )}
      </div>

      {/* Error display */}
      <AnimatePresence>
        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="px-4 max-w-3xl mx-auto w-full"
          >
            <div className={cn(
              'flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900 p-3'
            )}>
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400 flex-1">{state.error}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => actions.setError(null)}
                className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors flex-shrink-0"
                aria-label="Dismiss error"
              >
                <X size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={state.isLoading}
        disabled={state.isLoading}
        placeholder="Where do you want to travel?"
      />
    </div>
  );
}
