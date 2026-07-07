import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies basic mv-button class', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('mv-button');
  });

  it('applies variant classes', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('mv-button--outline');
  });

  it('applies size classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('mv-button--lg');
  });

  it('applies color classes', () => {
    render(<Button color="success">Success</Button>);
    expect(screen.getByRole('button')).toHaveClass('mv-button--success');
  });

  it('applies shape modifiers', () => {
    render(<Button shape="round">Round</Button>);
    expect(screen.getByRole('button')).toHaveClass('mv-button--round');
  });

  it('respects disabled state and blocks click events', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();

    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('forwards additional html attributes', () => {
    render(<Button aria-label="custom label">Btn</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'custom label');
  });
});
