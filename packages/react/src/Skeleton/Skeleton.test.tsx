import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Skeleton } from './Skeleton';

describe('Skeleton Component', () => {
  it('applies basic BEM class', () => {
    render(<Skeleton data-testid="sk" />);
    const sk = screen.getByTestId('sk');
    expect(sk).toHaveClass('mv-skeleton');
    expect(sk).toHaveClass('mv-skeleton--text');
    expect(sk).toHaveClass('mv-skeleton--shimmer');
  });

  it('applies variant modifiers', () => {
    render(<Skeleton variant="circle" data-testid="sk" />);
    const sk = screen.getByTestId('sk');
    expect(sk).toHaveClass('mv-skeleton--circle');
  });

  it('applies animation classes', () => {
    render(<Skeleton animation="pulse" data-testid="sk" />);
    const sk = screen.getByTestId('sk');
    expect(sk).toHaveClass('mv-skeleton--pulse');
  });

  it('applies inline width and height styles', () => {
    render(<Skeleton width="200px" height={40} data-testid="sk" />);
    const sk = screen.getByTestId('sk');
    expect(sk).toHaveStyle({ width: '200px', height: '40px' });
  });
});
