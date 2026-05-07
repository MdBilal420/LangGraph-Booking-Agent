'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, CalendarDays, Hotel, Car, MapPin, Backpack, Compass } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SuggestedQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isVisible: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Plane,
  CalendarDays,
  Hotel,
  Car,
  MapPin,
  Backpack,
};

const SUGGESTED_QUESTIONS = [
  {
    text: 'What time is my flight?',
    icon: 'Plane',
    category: 'Flight Info',
  },
  {
    text: 'Can I change my flight to next week?',
    icon: 'CalendarDays',
    category: 'Flight Changes',
  },
  {
    text: 'What hotels are available at my destination?',
    icon: 'Hotel',
    category: 'Hotels',
  },
  {
    text: 'What are my car rental options?',
    icon: 'Car',
    category: 'Transportation',
  },
  {
    text: 'What recommendations do you have for excursions?',
    icon: 'MapPin',
    category: 'Activities',
  },
  {
    text: 'What about lodging and transportation?',
    icon: 'Backpack',
    category: 'Travel Planning',
  },
];

export default function SuggestedQuestions({ onQuestionSelect, isVisible }: SuggestedQuestionsProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-8"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center">
          <Compass size={28} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-1.5">
          Where do you want to go?
        </h2>
        <p className="text-sm text-muted-foreground">
          I can help with flights, hotels, itineraries, and more
        </p>
      </motion.div>

      {/* Question cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUGGESTED_QUESTIONS.map((question, index) => {
          const Icon = iconMap[question.icon] || Compass;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.35 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuestionSelect(question.text)}
              className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl text-left',
                'border border-border bg-card',
                'hover:bg-secondary/60 hover:border-border/80',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-ring/40'
              )}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-0.5">
                  {question.category}
                </p>
                <p className="text-sm text-foreground leading-snug">{question.text}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
