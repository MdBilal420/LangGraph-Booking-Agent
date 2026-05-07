'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-md bg-muted', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
      <div className="flex-1 max-w-[70%] space-y-2">
        <ShimmerLine className="h-4 w-3/4" />
        <ShimmerLine className="h-4 w-full" />
        <ShimmerLine className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function DestinationSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <ShimmerLine className="h-40 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <ShimmerLine className="h-5 w-1/3" />
          <ShimmerLine className="h-5 w-12" />
        </div>
        <ShimmerLine className="h-4 w-full" />
        <ShimmerLine className="h-4 w-2/3" />
        <div className="flex gap-2 pt-1">
          <ShimmerLine className="h-6 w-16 rounded-full" />
          <ShimmerLine className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function FlightSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex justify-between items-center">
        <ShimmerLine className="h-5 w-24" />
        <ShimmerLine className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <ShimmerLine className="h-4 w-20" />
        <ShimmerLine className="h-3 w-16" />
        <ShimmerLine className="h-4 w-20" />
      </div>
      <ShimmerLine className="h-4 w-32" />
    </div>
  );
}

export function HotelSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex gap-3 p-3">
        <ShimmerLine className="h-20 w-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <ShimmerLine className="h-5 w-2/3" />
          <ShimmerLine className="h-4 w-1/2" />
          <ShimmerLine className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ type = 'message' }: { type?: 'message' | 'destination' | 'flight' | 'hotel' }) {
  const skeletons = {
    message: MessageSkeleton,
    destination: DestinationSkeleton,
    flight: FlightSkeleton,
    hotel: HotelSkeleton,
  };

  const Component = skeletons[type];
  return <Component />;
}
