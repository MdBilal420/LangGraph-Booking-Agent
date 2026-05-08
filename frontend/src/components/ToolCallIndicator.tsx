'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wrench, CheckCircle2 } from 'lucide-react';
import { ToolCallIndicatorProps } from '@/types/components';

export default function ToolCallIndicator({ toolCalls, isVisible }: ToolCallIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || !toolCalls || toolCalls.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-3 pt-3 border-t border-border/50"
    >
      <motion.button
        whileHover={{ x: 1 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Wrench size={12} />
          <span>Used {toolCalls.length} tool{toolCalls.length > 1 ? 's' : ''}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={12} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {toolCalls.map((toolCall, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg border border-border bg-secondary/50 p-2.5"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500" />
                    <span className="text-xs font-medium text-foreground">{toolCall.name}</span>
                  </div>

                  {Object.keys(toolCall.args).length > 0 && (
                    <div className="mb-1.5">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Parameters</span>
                      <pre className="mt-1 text-[10px] bg-background rounded-md p-2 overflow-x-auto text-foreground border border-border">
                        {JSON.stringify(toolCall.args, null, 2)}
                      </pre>
                    </div>
                  )}

                  {toolCall.result !== null && toolCall.result !== undefined && (
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Result</span>
                      <div className="mt-1 text-[10px] bg-background rounded-md p-2 text-foreground border border-border overflow-x-auto break-words">
                        {typeof toolCall.result === 'string'
                          ? String(toolCall.result)
                          : JSON.stringify(toolCall.result, null, 2)}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
