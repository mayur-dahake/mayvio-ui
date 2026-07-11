import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup Component', () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ];

  it('renders correctly', () => {
    render(<RadioGroup name="group1" options={options} />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    expect(screen.getByLabelText('Option B')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    render(<RadioGroup name="group2" options={options} onChange={handleChange} />);
    const radioA = screen.getByLabelText('Option A');
    await userEvent.click(radioA);
    expect(handleChange).toHaveBeenCalledWith('a');
  });

  it('is disabled when disabled prop is true', () => {
    render(<RadioGroup name="group3" options={options} disabled />);
    const radioA = screen.getByLabelText('Option A');
    expect(radioA).toBeDisabled();
  });
});
