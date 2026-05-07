'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseStreamingTextOptions {
  text: string;
  speed?: number;
  enabled?: boolean;
  onComplete?: () => void;
}

export function useStreamingText({
  text,
  speed = 12,
  enabled = true,
  onComplete,
}: UseStreamingTextOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStreaming = useCallback(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayedText(text);
        setIsComplete(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onComplete?.();
      } else {
        setDisplayedText(text.slice(0, indexRef.current));
      }
    }, speed);
  }, [text, speed, onComplete]);

  useEffect(() => {
    if (enabled && text) {
      startStreaming();
    } else {
      setDisplayedText(text);
      setIsComplete(true);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, enabled, startStreaming]);

  return { displayedText, isComplete };
}
