'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Wifi, Waves, Utensils, Dumbbell } from 'lucide-react';
import { cn } from '@/utils/cn';

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  rating: number;
  reviews: number;
  imageColor: string;
  saved?: boolean;
  onSave?: (id: string) => void;
}

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Pool: Waves,
  Breakfast: Utensils,
  Gym: Dumbbell,
  Spa: Waves,
  Rooftop: MapPin,
};

export default function HotelCard({
  id,
  name,
  location,
  stars,
  pricePerNight,
  currency,
  amenities,
  reviews,
  imageColor,
  saved = false,
  onSave,
}: HotelCardProps) {
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
        'rounded-xl border border-border bg-card overflow-hidden',
        'shadow-sm hover:shadow-md transition-shadow duration-200'
      )}
    >
      <div className="flex gap-3 p-3">
        {/* Image placeholder */}
        <div className={cn('w-24 h-24 rounded-xl bg-gradient-to-br flex-shrink-0', imageColor)} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-card-foreground truncate">{name}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                <MapPin size={11} />
                <span className="truncate">{location}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={cn(
                'p-1 rounded-full transition-colors flex-shrink-0',
                isSaved ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
              )}
              aria-label={isSaved ? 'Remove from saved' : 'Save hotel'}
            >
              <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={cn(
                    i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {amenities.slice(0, 3).map((amenity) => {
              const Icon = amenityIcons[amenity] || Wifi;
              return (
                <span
                  key={amenity}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px]"
                >
                  <Icon size={10} />
                  {amenity}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-3 pb-3 pt-1 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-card-foreground">{currency} {pricePerNight}</span>
          <span className="text-xs text-muted-foreground"> /night</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium',
            'bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          )}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
