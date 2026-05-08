'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import { useChat } from '@/contexts/ChatContext';

export default function AppShell() {
  const { state, actions } = useChat();

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-background text-foreground">
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader
          onNewChat={actions.startNewConversation}
          threadTitle={state.currentThreadId ? 'Trabot' : undefined}
          isConnected={true}
        />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-h-0 flex flex-col"
        >
          <ChatContainer />
        </motion.main>
      </div>

    </div>
  );
}
