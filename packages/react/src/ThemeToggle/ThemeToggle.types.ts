import { ButtonHTMLAttributes } from 'react';

export interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The current theme. If not provided, it toggles the "dark" class on the documentElement (uncontrolled mode).
   */
  theme?: 'light' | 'dark';
  /**
   * Callback fired when the theme toggle is clicked.
   */
  onToggleTheme?: () => void;
}
