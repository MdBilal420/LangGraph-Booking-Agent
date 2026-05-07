'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FlightCardProps {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  status: 'cheapest' | 'fastest' | 'recommended' | null;
  saved?: boolean;
  onSave?: (id: string) => void;
}

const statusStyles = {
  cheapest: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900',
  fastest: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900',
  recommended: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900',
};

const statusLabels = {
  cheapest: 'Cheapest',
  fastest: 'Fastest',
  recommended: 'Best',
};

export default function FlightCard({
  id,
  airline,
  flightNumber,
  origin,
  destination,
  departureTime,
  arrivalTime,
  duration,
  price,
  currency,
  stops,
  status,
  saved = false,
  onSave,
}: FlightCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      className={cn(
        'rounded-xl border border-border bg-card p-4',
        'shadow-sm hover:shadow-md transition-shadow duration-200'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Plane size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">{airline}</p>
            <p className="text-xs text-muted-foreground">{flightNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status && (
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', statusStyles[status])}>
              {statusLabels[status]}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={cn(
              'p-1.5 rounded-full transition-colors',
              isSaved ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
            )}
            aria-label={isSaved ? 'Remove from saved' : 'Save flight'}
          >
            <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-1">
        <div className="text-center">
          <p className="text-lg font-bold text-card-foreground">{departureTime}</p>
          <p className="text-xs text-muted-foreground">{origin}</p>
        </div>
        <div className="flex-1 mx-4 flex flex-col items-center">
          <div className="flex items-center gap-2 w-full">
            <div className="h-px flex-1 bg-border" />
            <Plane size={14} className="text-muted-foreground rotate-90" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{duration}</span>
          </div>
          {stops === 0 && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Direct</span>
          )}
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-card-foreground">{arrivalTime}</p>
          <p className="text-xs text-muted-foreground">{destination}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div>
          <span className="text-xl font-bold text-card-foreground">{currency} {price}</span>
          <span className="text-xs text-muted-foreground ml-1">/person</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium',
            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          )}
        >
          Select
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
