import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker.js';

describe('DatePicker Component A11y', () => {
  it('trigger has correct aria labels', () => {
    render(<DatePicker placeholder="Select date" />);
    const trigger = screen.getByRole('button', { name: /Choose date/i });
    expect(trigger).toBeInTheDocument();
  });

  it('disabled trigger is disabled', () => {
    render(<DatePicker placeholder="Select" disabled />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });
});
