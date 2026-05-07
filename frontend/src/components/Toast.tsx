'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import { toastVariants } from '@/utils/animations';

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900',
  error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900',
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900',
};

const iconColors = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

export default function Toast({ message, type, isVisible, onClose, duration = 4000 }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            'fixed top-4 left-1/2 -translate-x-1/2 z-[100]',
            'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg',
            'min-w-[300px] max-w-md',
            styles[type]
          )}
        >
          <Icon size={18} className={cn('flex-shrink-0', iconColors[type])} />
          <span className="text-sm font-medium flex-1">{message}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X size={14} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
