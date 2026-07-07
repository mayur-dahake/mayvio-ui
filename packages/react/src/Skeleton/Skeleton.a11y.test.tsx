import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Skeleton } from './Skeleton';

describe('Skeleton Accessibility', () => {
  it('adds aria-busy attribute to element representation', () => {
    render(<Skeleton data-testid="sk" />);
    const sk = screen.getByTestId('sk');
    expect(sk).toHaveAttribute('aria-busy', 'true');
  });
});
