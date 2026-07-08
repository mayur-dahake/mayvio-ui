import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ThemeToggle } from './ThemeToggle.js';

describe('ThemeToggle', () => {
  let root: HTMLElement;

  beforeEach(() => {
    root = document.documentElement;
    root.classList.remove('dark');
  });

  afterEach(() => {
    root.classList.remove('dark');
  });

  it('renders correctly', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles dark mode class on document when clicked (uncontrolled)', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(root.classList.contains('dark')).toBe(false);

    fireEvent.click(button);
    expect(root.classList.contains('dark')).toBe(true);

    fireEvent.click(button);
    expect(root.classList.contains('dark')).toBe(false);
  });

  it('calls onToggleTheme when provided (controlled)', () => {
    const handleToggle = vi.fn();
    render(<ThemeToggle theme="light" onToggleTheme={handleToggle} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(root.classList.contains('dark')).toBe(false); // Class should not be toggled automatically
  });
});
