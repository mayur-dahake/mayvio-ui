import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies the correct default classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('mv-badge');
  });

  it('applies variant classes', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge).toHaveClass('mv-badge--success');
  });

  it('applies size classes', () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText('Small');
    expect(badge).toHaveClass('mv-badge--sm');
  });

  it('applies outline class', () => {
    render(<Badge outline>Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('mv-badge--outline');
  });

  it('applies dot class', () => {
    render(<Badge dot>Dot</Badge>);
    const badge = screen.getByText('Dot');
    expect(badge).toHaveClass('mv-badge--dot');
  });

  it('forwards additional props', () => {
    render(<Badge data-testid="custom-badge">Props</Badge>);
    expect(screen.getByTestId('custom-badge')).toBeInTheDocument();
  });
});
