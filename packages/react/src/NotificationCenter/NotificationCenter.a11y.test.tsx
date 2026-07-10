import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from './NotificationCenter.js';

describe('NotificationCenter Component A11y', () => {
  it('trigger is accessible', () => {
    render(<NotificationCenter notifications={[]} />);
    expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
  });
});
