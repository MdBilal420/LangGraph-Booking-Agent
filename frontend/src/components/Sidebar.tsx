'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquarePlus,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Plane,
  User,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import ThemeToggle from './ThemeToggle';
import { ChatThread } from '@/types/chat';

interface SidebarProps {
  threads: ChatThread[];
  currentThreadId: string | null;
  onNewChat: () => void;
  onSelectThread: (threadId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  passengerId: string;
}

export default function Sidebar({
  threads,
  currentThreadId,
  onNewChat,
  onSelectThread,
  isOpen,
  onToggle,
  passengerId,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 280 : 72,
          x: 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed lg:static left-0 top-0 bottom-0 z-50',
          'bg-sidebar border-r border-sidebar-border',
          'flex flex-col overflow-hidden',
          'lg:translate-x-0',
          !isOpen && '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 h-16 border-b border-sidebar-border flex-shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="expanded-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                  <Plane size={16} className="text-primary-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground text-sm">WanderAI</span>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center mx-auto"
              >
                <Plane size={16} className="text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className={cn(
              'p-1.5 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-border/50 transition-colors flex-shrink-0',
              !isOpen && 'hidden lg:flex'
            )}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </motion.button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 py-3 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewChat}
            className={cn(
              'flex items-center gap-2.5 rounded-xl transition-colors',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              isOpen ? 'w-full px-3.5 py-2.5' : 'w-10 h-10 justify-center mx-auto'
            )}
          >
            <MessageSquarePlus size={18} />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <AnimatePresence>
            {isOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-2 mb-2"
              >
                Recent
              </motion.p>
            )}
          </AnimatePresence>

          {threads.map((thread) => (
            <motion.button
              key={thread.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectThread(thread.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg transition-colors w-full',
                'hover:bg-sidebar-border/50',
                currentThreadId === thread.id
                  ? 'bg-sidebar-border/70 text-sidebar-foreground'
                  : 'text-sidebar-foreground/70',
                isOpen ? 'px-2.5 py-2 justify-start' : 'px-0 py-2 justify-center'
              )}
            >
              <MessageSquare size={16} className="flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 text-left min-w-0 overflow-hidden"
                  >
                    <p className="text-sm truncate">{thread.title}</p>
                    <p className="text-[10px] text-sidebar-foreground/50 truncate">
                      {thread.date} · {thread.messages} messages
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-sidebar-border flex-shrink-0 space-y-2">
          <div className="flex items-center justify-center">
            <ThemeToggle compact />
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-sidebar-border/30"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User size={13} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-sidebar-foreground truncate">Passenger</p>
                  <p className="text-[10px] text-sidebar-foreground/50 truncate font-mono">{passengerId}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isOpen && (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
