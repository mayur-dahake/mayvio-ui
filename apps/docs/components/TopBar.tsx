'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="topbar" id="topbar">
      <span style={{ fontWeight: 600, color: 'var(--mv-color-text-muted)', fontSize: '0.875rem' }}>
        v4.0.0-alpha.1
      </span>
      <div className="topbar-actions">
        <a
          href="https://github.com/mayur-dahake/mayvio-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          id="github-link"
        >
          ⭐ GitHub
        </a>
        {mounted && (
          <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}
      </div>
    </header>
  );
}
