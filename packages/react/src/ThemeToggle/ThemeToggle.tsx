import { useState, useEffect } from 'react';
import { ThemeToggleProps } from './ThemeToggle.types.js';

export function ThemeToggle({ theme, onToggleTheme, className = '', ...props }: ThemeToggleProps) {
  const [internalTheme, setInternalTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === undefined && typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternalTheme(isDark ? 'dark' : 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (root.classList.contains('dark')) {
          root.classList.remove('dark');
          setInternalTheme('light');
        } else {
          root.classList.add('dark');
          setInternalTheme('dark');
        }
      }
    }
  };

  const currentTheme = theme || internalTheme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      type="button"
      className={`mv-theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      {...props}
    >
      <svg
        className="mv-theme-toggle__icon mv-theme-toggle__icon--sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        className="mv-theme-toggle__icon mv-theme-toggle__icon--moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
