import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { ThemeToggle } from './ThemeToggle.js';

describe('ThemeToggle a11y', () => {
  it('should have an aria-label', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });
});
