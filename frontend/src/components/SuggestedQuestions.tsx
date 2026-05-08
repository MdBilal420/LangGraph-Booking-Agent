'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, CalendarDays, Hotel, Car, MapPin, Backpack, Compass, ShieldCheck } from 'lucide-react';
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

type FilterCategory = 'All' | 'Flights' | 'Hotels' | 'Cars' | 'Activities';

const FILTER_TABS: { label: FilterCategory; icon: React.ElementType }[] = [
  { label: 'All', icon: Compass },
  { label: 'Flights', icon: Plane },
  { label: 'Hotels', icon: Hotel },
  { label: 'Cars', icon: Car },
  { label: 'Activities', icon: MapPin },
];

const CAPABILITIES = [
  { label: 'Flights', icon: Plane },
  { label: 'Hotels', icon: Hotel },
  { label: 'Cars', icon: Car },
  { label: 'Excursions', icon: MapPin },
  { label: 'Policies', icon: ShieldCheck },
];

const SUGGESTED_QUESTIONS = [
  {
    text: 'What time is my flight?',
    icon: 'Plane',
    category: 'Flight Info',
    filterCategory: 'Flights' as FilterCategory,
  },
  {
    text: 'Can I change my flight to next week?',
    icon: 'CalendarDays',
    category: 'Flight Changes',
    filterCategory: 'Flights' as FilterCategory,
  },
  {
    text: 'What hotels are available at my destination?',
    icon: 'Hotel',
    category: 'Hotels',
    filterCategory: 'Hotels' as FilterCategory,
  },
  {
    text: 'What are my car rental options?',
    icon: 'Car',
    category: 'Transportation',
    filterCategory: 'Cars' as FilterCategory,
  },
  {
    text: 'What recommendations do you have for excursions?',
    icon: 'MapPin',
    category: 'Activities',
    filterCategory: 'Activities' as FilterCategory,
  },
  {
    text: 'What about lodging and transportation?',
    icon: 'Backpack',
    category: 'Travel Planning',
    filterCategory: 'All' as FilterCategory,
  },
];

export default function SuggestedQuestions({ onQuestionSelect, isVisible }: SuggestedQuestionsProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');

  if (!isVisible) return null;

  const filteredQuestions =
    activeCategory === 'All'
      ? SUGGESTED_QUESTIONS
      : SUGGESTED_QUESTIONS.filter((q) => q.filterCategory === activeCategory);

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
        className="text-center mb-6"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center">
          <Compass size={28} className="text-primary" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5">
          Your Swiss Airlines Travel Assistant
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Manage bookings, change flights, reserve hotels & cars, and discover excursions — all in one conversation.
        </p>

        {/* Capability badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={cn(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs',
                  'bg-secondary/70 text-secondary-foreground border border-border/60'
                )}
              >
                <Icon size={12} className="text-primary" />
                <span className="font-medium">{cap.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Category filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="flex items-center justify-center gap-1.5 mb-4 flex-wrap"
      >
        {FILTER_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveCategory(tab.label)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                'focus:outline-none focus:ring-2 focus:ring-ring/40',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              )}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Question cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filteredQuestions.map((question, index) => {
          const Icon = iconMap[question.icon] || Compass;
          return (
            <motion.button
              key={question.text}
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
