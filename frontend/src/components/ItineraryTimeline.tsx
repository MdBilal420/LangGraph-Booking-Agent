'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Hotel, MapPin, UtensilsCrossed, Bus, ChevronDown, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Activity {
  time: string;
  title: string;
  location: string;
  type: 'flight' | 'hotel' | 'activity' | 'food' | 'transport';
  description?: string;
}

interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

interface ItineraryTimelineProps {
  days: Day[];
}

const typeConfig = {
  flight: { icon: Plane, color: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-900' },
  hotel: { icon: Hotel, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-900' },
  activity: { icon: MapPin, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900' },
  food: { icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-900' },
  transport: { icon: Bus, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-700' },
};

export default function ItineraryTimeline({ days }: ItineraryTimelineProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {days.map((day) => {
        const isExpanded = expandedDays.has(day.day);
        return (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: day.day * 0.05 }}
            className={cn(
              'rounded-xl border border-border bg-card overflow-hidden',
              'shadow-sm'
            )}
          >
            {/* Day header */}
            <motion.button
              onClick={() => toggleDay(day.day)}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3',
                'text-left transition-colors',
                'dark:hover:bg-white/[0.02]'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{day.day}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">Day {day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{day.activities.length} activities</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-muted-foreground" />
                </motion.div>
              </div>
            </motion.button>

            {/* Activities */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <div className="relative ml-4">
                      {/* Timeline line */}
                      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border" />

                      {day.activities.map((activity, index) => {
                        const config = typeConfig[activity.type];
                        const Icon = config.icon;

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.25 }}
                            className="relative flex gap-3 py-2.5"
                          >
                            {/* Timeline dot */}
                            <div className={cn(
                              'relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                              config.color
                            )}>
                              <Icon size={12} />
                            </div>

                            {/* Activity content */}
                            <div className={cn(
                              'flex-1 rounded-lg border p-3',
                              'bg-secondary/50 dark:bg-secondary/30',
                              config.border
                            )}>
                              <div className="flex items-center gap-2 mb-1">
                                <Clock size={11} className="text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">{activity.time}</span>
                              </div>
                              <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{activity.location}</p>
                              {activity.description && (
                                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
