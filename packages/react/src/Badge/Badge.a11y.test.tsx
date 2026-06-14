import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Accessibility', () => {
  it('should support custom aria-label', () => {
    render(<Badge aria-label="3 new notifications">3</Badge>);
    const badge = screen.getByLabelText('3 new notifications');
    expect(badge).toBeInTheDocument();
  });

  it('should support role="status"', () => {
    render(<Badge role="status">Status badge</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
  });
});
