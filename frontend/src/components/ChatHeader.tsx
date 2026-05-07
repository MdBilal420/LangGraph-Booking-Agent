'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Wifi, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ChatHeaderProps {
  onNewChat?: () => void;
  threadTitle?: string;
  isConnected?: boolean;
}

export default function ChatHeader({
  onNewChat,
  threadTitle,
  isConnected = true,
}: ChatHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-center justify-between px-4 py-3 h-16',
        'border-b border-border bg-background/80 backdrop-blur-md',
        'sticky top-0 z-30'
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-teal-500 flex items-center justify-center shadow-sm">
            <Bot size={18} className="text-white" />
          </div>
          {isConnected && (
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">
            {threadTitle || 'Travel Assistant'}
          </h1>
          <div className="flex items-center gap-1">
            <Wifi size={10} className={isConnected ? 'text-emerald-500' : 'text-red-500'} />
            <span className="text-[11px] text-muted-foreground">
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onNewChat && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewChat}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors',
              'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
            aria-label="Start new chat"
          >
            <Plus size={16} />
            <span className="text-sm font-medium hidden sm:inline">New Chat</span>
          </motion.button>
        )}

      </div>
    </motion.header>
  );
}
