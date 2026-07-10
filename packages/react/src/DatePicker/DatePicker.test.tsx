import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker.js';

describe('DatePicker Component', () => {
  it('renders the placeholder when no date is selected', () => {
    render(<DatePicker placeholder="Select date..." />);
    expect(screen.getByText('Select date...')).toBeInTheDocument();
  });

  it('renders the selected date format correctly', () => {
    const d = new Date(2023, 5, 15); // June 15, 2023
    render(<DatePicker value={d} />);
    expect(screen.getByText('June 15, 2023')).toBeInTheDocument();
  });

  it('opens calendar on click', async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Select date..." />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByText('Select date...'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Verify calendar header has month name (depends on current date, but basic check is fine)
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('calls onChange when a date is selected', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<DatePicker onChange={handleChange} />);

    const trigger = screen.getByRole('button', { name: /Choose date/i });
    await user.click(trigger);

    // Select the 15th of the current month
    const dayButton = screen.getByText('15', {
      selector: '.mv-datepicker-cell:not(.mv-datepicker-cell--outside-month)',
    });
    await user.click(dayButton);

    expect(handleChange).toHaveBeenCalled();
    const calledDate = handleChange.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(15);
  });

  it('disables the component if disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    const trigger = screen.getByRole('button', { name: /Choose date/i });
    await user.click(trigger);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
