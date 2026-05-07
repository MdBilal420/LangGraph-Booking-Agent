'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-5"
    >
      <div className="flex items-start gap-3 max-w-[80%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles size={14} className="text-white" />
        </div>

        {/* Thinking bubble */}
        <div
          className={cn(
            'rounded-2xl rounded-tl-sm px-4 py-3',
            'bg-secondary border border-border shadow-sm'
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-muted-foreground">AI is thinking</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Shimmer lines */}
          <div className="space-y-1.5 w-48">
            <div className="h-2 rounded-full bg-muted overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
            <div className="h-2 rounded-full bg-muted w-3/4 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear', delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
