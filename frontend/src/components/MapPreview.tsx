'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MapPreviewProps {
  origin?: string;
  destination?: string;
  className?: string;
}

export default function MapPreview({ origin = 'New York', destination = 'Paris', className }: MapPreviewProps) {
  return (
    <div className={`relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 ${className}`}>
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-600" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated route line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 192" preserveAspectRatio="xMidYMid meet">
        <motion.path
          d="M 80 120 Q 200 40 320 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
        />
      </svg>

      {/* Origin pin */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        className="absolute left-[18%] top-[58%]"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <MapPin size={16} className="text-primary-foreground" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground whitespace-nowrap">{origin}</p>
      </motion.div>

      {/* Destination pin */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
        className="absolute right-[18%] top-[38%]"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <MapPin size={16} className="text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground whitespace-nowrap">{destination}</p>
      </motion.div>

      {/* Plane icon along route */}
      <motion.div
        initial={{ offsetDistance: '0%', opacity: 0 }}
        animate={{ offsetDistance: '100%', opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
        className="absolute w-6 h-6 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center"
        style={{ offsetPath: "path('M 80 120 Q 200 40 320 80')" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary rotate-45">
          <path d="M2 12h20M12 2l10 10-10 10" />
        </svg>
      </motion.div>
    </div>
  );
}
