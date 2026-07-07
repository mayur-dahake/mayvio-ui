import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ToastContainer } from './ToastContainer';
import { toast } from './toast-service';

describe('Toast Component Suite', () => {
  it('renders ToastContainer correctly', () => {
    render(<ToastContainer />);
    const container = screen.getByTestId('toast-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('mv-toast-container--top-right');
  });

  it('adds and auto-dismisses toasts through toast-service', async () => {
    vi.useFakeTimers();
    render(<ToastContainer />);

    act(() => {
      toast.success('Saved successfully!', 'Success', 100);
    });

    expect(screen.getByText('Saved successfully!')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.queryByText('Saved successfully!')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('dismisses toast on close button click', async () => {
    render(<ToastContainer />);

    act(() => {
      toast.info('Info message');
    });

    const closeBtn = screen.getByRole('button', { name: 'Dismiss toast' });
    await userEvent.click(closeBtn);

    expect(screen.queryByText('Info message')).not.toBeInTheDocument();
  });
});
