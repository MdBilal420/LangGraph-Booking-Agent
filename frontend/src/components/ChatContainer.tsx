'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/contexts/ChatContext';
import MessageList from './MessageList';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInput from './ChatInput';
import { AlertCircle, X, Lightbulb } from 'lucide-react';
import { cn } from '@/utils/cn';

function TipBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="px-4 pt-3 max-w-3xl mx-auto w-full"
    >
      <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-3">
        <Lightbulb size={16} className="text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80 flex-1 leading-relaxed">
          <span className="font-semibold">Tip:</span> I can check your real bookings, change flights, book hotels & cars, and look up airline policies. Try asking &quot;What time is my flight?&quot;
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0"
          aria-label="Dismiss tip"
        >
          <X size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ChatContainer() {
  const { state, actions } = useChat();
  const [tipDismissed, setTipDismissed] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('trabot-tip-dismissed-v1') === 'true';
  });

  const handleDismissTip = () => {
    setTipDismissed(true);
    localStorage.setItem('trabot-tip-dismissed-v1', 'true');
  };

  const handleQuestionSelect = (question: string) => {
    actions.sendMessage(question);
  };

  const handleSendMessage = (message: string) => {
    actions.sendMessage(message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tip Banner */}
      <AnimatePresence>
        {state.messages.length === 0 && state.showSuggestions && !tipDismissed && (
          <TipBanner onDismiss={handleDismissTip} />
        )}
      </AnimatePresence>

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
        placeholder="Ask about flights, hotels, car rentals, or excursions..."
      />
    </div>
  );
}
