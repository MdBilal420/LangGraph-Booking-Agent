'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Sparkles, Copy, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useStreamingText } from '@/hooks/useStreamingText';
import { MessageBubbleProps } from '@/types/components';
import { useChat } from '@/contexts/ChatContext';
import ToolCallIndicator from './ToolCallIndicator';
import FollowUpChips from './FollowUpChips';

export default function MessageBubble({ message, isLatest = false }: MessageBubbleProps) {
  const { actions } = useChat();
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [copied, setCopied] = useState(false);

  const { displayedText, isComplete } = useStreamingText({
    text: message.content,
    speed: 8,
    enabled: isLatest && !isUser && message.content.length > 0,
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayContent = isLatest && !isUser ? displayedText : message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('flex mb-5', isUser ? 'justify-end' : 'justify-start')}
    >
      <div className={cn('flex gap-3 max-w-[85%] lg:max-w-[75%]', isUser ? 'flex-row-reverse' : 'flex-row')}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className={cn(
            'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm',
            isUser
              ? 'bg-gradient-to-br from-primary to-teal-500'
              : 'bg-gradient-to-br from-primary/80 to-teal-400'
          )}
        >
          {isUser ? (
            <User size={14} className="text-white" />
          ) : (
            <Sparkles size={14} className="text-white" />
          )}
        </motion.div>

        {/* Bubble */}
        <div className="flex flex-col gap-1">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
            className={cn(
              'relative px-4 py-3 rounded-2xl shadow-sm',
              'prose prose-sm max-w-none',
              isUser
                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                : 'bg-card text-card-foreground border border-border rounded-tl-sm'
            )}
          >
            <div
              className={cn(
                'prose-sm max-w-none leading-relaxed',
                isUser
                  ? 'prose-invert [&_*]:text-primary-foreground'
                  : '[&_*]:text-card-foreground'
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className={cn(
                        'px-1 py-0.5 rounded text-xs font-mono',
                        isUser ? 'bg-white/20' : 'bg-muted'
                      )}>
                        {children}
                      </code>
                    ) : (
                      <pre className={cn(
                        'block p-3 rounded-lg text-xs font-mono overflow-x-auto my-2',
                        isUser ? 'bg-white/10' : 'bg-muted'
                      )}>
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline opacity-90 hover:opacity-100">
                      {children}
                    </a>
                  ),
                }}
              >
                {displayContent}
              </ReactMarkdown>

              {/* Streaming cursor */}
              {isLatest && !isUser && !isComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                />
              )}
            </div>

            {/* Tool Calls */}
            {message.tool_calls && message.tool_calls.length > 0 && (
              <ToolCallIndicator toolCalls={message.tool_calls} isVisible={true} />
            )}
          </motion.div>

          {/* Footer row */}
          <div className={cn('flex items-center gap-2', isUser ? 'justify-end pr-1' : 'justify-start pl-1')}>
            <span className="text-[10px] text-muted-foreground/70">{timestamp}</span>
            {!isUser && isComplete && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-1 rounded-md text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary transition-colors"
                aria-label="Copy message"
              >
                {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
              </motion.button>
            )}
          </div>

          {/* Follow-up suggestions */}
          {!isUser && isLatest && isComplete && (
            <FollowUpChips
              toolCalls={message.tool_calls}
              onSuggestionClick={(suggestion) => actions.sendMessage(suggestion)}
              isVisible={true}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
