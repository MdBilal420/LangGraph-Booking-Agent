'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Thermometer, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  imageColor: string;
  tags: string[];
  temperature: number;
  saved?: boolean;
  onSave?: (id: string) => void;
}

export default function DestinationCard({
  id,
  name,
  country,
  description,
  rating,
  reviews,
  priceLevel,
  imageColor,
  tags,
  temperature,
  saved = false,
  onSave,
}: DestinationCardProps) {
  const [isSaved, setIsSaved] = useState(saved);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={cn(
        'group rounded-2xl border border-border bg-card overflow-hidden',
        'shadow-sm hover:shadow-lg transition-shadow duration-300'
      )}
    >
      {/* Image placeholder */}
      <div className={cn('relative h-48 bg-gradient-to-br overflow-hidden', imageColor)}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md',
              'transition-colors duration-200',
              isSaved
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            )}
            aria-label={isSaved ? 'Remove from saved' : 'Save destination'}
          >
            <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800">
            {priceLevel}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
            <Thermometer size={12} />
            {temperature}°C
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-card-foreground">{name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-0.5">
              <MapPin size={13} />
              <span>{country}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
            <Star size={13} className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-400">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {reviews.toLocaleString()} reviews
          </span>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex items-center gap-1.5 text-sm font-medium text-primary',
            'hover:text-primary/80 transition-colors mt-1'
          )}
        >
          Explore
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
