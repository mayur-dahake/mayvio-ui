import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tooltip } from './Tooltip';

describe('Tooltip Accessibility', () => {
  it('applies basic ARIA attributes correctly', () => {
    render(
      <Tooltip content="Helper text">
        <button id="trigger">Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    const tip = screen.getByText('Helper text');

    expect(trigger).toHaveAttribute('aria-describedby');
    expect(tip).toHaveAttribute('role', 'tooltip');
  });
});
