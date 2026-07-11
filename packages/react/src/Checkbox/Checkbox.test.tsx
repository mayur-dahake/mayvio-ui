import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders correctly', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Subscribe" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('Subscribe');
    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('renders in indeterminate state', () => {
    render(<Checkbox label="Mixed" indeterminate />);
    const checkbox = screen.getByLabelText('Mixed') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />);
    const checkbox = screen.getByLabelText('Disabled');
    expect(checkbox).toBeDisabled();
  });

});
