'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getFollowUpSuggestions } from '@/utils/followUpSuggestions';
import { ToolCall } from '@/types/chat';

interface FollowUpChipsProps {
  toolCalls?: ToolCall[] | null;
  onSuggestionClick: (suggestion: string) => void;
  isVisible: boolean;
}

export default function FollowUpChips({ toolCalls, onSuggestionClick, isVisible }: FollowUpChipsProps) {
  if (!isVisible) return null;

  const suggestions = getFollowUpSuggestions(toolCalls);
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className="mt-1"
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <MessageSquare size={10} className="text-muted-foreground/60" />
        <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">
          Suggested follow-ups
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.08 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSuggestionClick(suggestion)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium',
              'bg-secondary/80 text-secondary-foreground border border-border/60',
              'hover:bg-primary/10 hover:border-primary/30 hover:text-primary',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ring/40'
            )}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
