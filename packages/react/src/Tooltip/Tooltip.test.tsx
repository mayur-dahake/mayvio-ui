import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  it('renders trigger element correctly', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('keeps tooltip hidden initially', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    const tip = screen.getByText('Tooltip text');
    expect(tip).not.toHaveClass('mv-tooltip--visible');
  });

  it('shows tooltip on hover and hides on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    const tip = screen.getByText('Tooltip text');

    await userEvent.hover(trigger);
    expect(tip).toHaveClass('mv-tooltip--visible');

    await userEvent.unhover(trigger);
    expect(tip).not.toHaveClass('mv-tooltip--visible');
  });

  it('applies placement class mapping modifier', () => {
    render(
      <Tooltip content="Tooltip text" placement="right">
        <button>Trigger</button>
      </Tooltip>
    );
    const tip = screen.getByText('Tooltip text');
    expect(tip).toHaveClass('mv-tooltip--right');
  });
});
