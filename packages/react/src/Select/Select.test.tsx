import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Select } from './Select';

describe('Select Component', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  it('renders correctly', () => {
    render(<Select options={options} data-testid="select" />);
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} data-testid="select" />);
    const select = screen.getByTestId('select');
    await userEvent.selectOptions(select, '2');
    // For native select, the event gives the synthetic event. We can check if it was called.
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={options} disabled data-testid="select" />);
    expect(screen.getByTestId('select')).toBeDisabled();
  });
});
