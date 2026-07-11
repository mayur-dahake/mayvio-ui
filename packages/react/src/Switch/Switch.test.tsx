import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders correctly', () => {
    render(<Switch label="Airplane Mode" />);
    expect(screen.getByLabelText('Airplane Mode')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    render(<Switch label="Notifications" onChange={handleChange} />);
    const toggle = screen.getByLabelText('Notifications');
    await userEvent.click(toggle);
    expect(handleChange).toHaveBeenCalled();
    expect(toggle).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch label="Disabled" disabled />);
    const toggle = screen.getByLabelText('Disabled');
    expect(toggle).toBeDisabled();
  });

});
