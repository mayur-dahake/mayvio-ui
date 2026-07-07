import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

describe('Button Accessibility', () => {
  it('has accessible role', () => {
    render(<Button>Clickable Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('exposes custom aria labels', () => {
    render(<Button aria-label="Submit Form">✓</Button>);
    expect(screen.getByRole('button', { name: 'Submit Form' })).toBeInTheDocument();
  });
});
