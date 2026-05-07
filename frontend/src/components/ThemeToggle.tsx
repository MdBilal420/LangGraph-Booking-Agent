'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export default function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className={cn('w-9 h-9 rounded-lg bg-secondary animate-pulse', className)} />
    );
  }

  const icon = resolvedTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex items-center justify-center rounded-lg transition-colors',
        'text-muted-foreground hover:text-foreground hover:bg-secondary',
        compact ? 'w-9 h-9' : 'w-10 h-10',
        className
      )}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
