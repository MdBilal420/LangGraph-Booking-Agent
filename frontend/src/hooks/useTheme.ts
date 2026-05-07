'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('travel-chat-theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    const resolve = () => {
      const resolved = theme === 'system'
        ? (systemDark.matches ? 'dark' : 'light')
        : theme;
      setResolvedTheme(resolved);

      if (resolved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    resolve();

    const listener = () => {
      if (theme === 'system') {
        resolve();
      }
    };
    systemDark.addEventListener('change', listener);
    return () => systemDark.removeEventListener('change', listener);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('travel-chat-theme', newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  }, [theme, setTheme]);

  return { theme, resolvedTheme, setTheme, toggleTheme, mounted };
}
