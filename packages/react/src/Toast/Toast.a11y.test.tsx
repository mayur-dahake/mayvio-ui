import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from './ToastContainer';
import { toast } from './toast-service';

describe('Toast Accessibility', () => {
  it('applies alerts status roles to standard toasts', () => {
    render(<ToastContainer />);

    act(() => {
      toast.success('Accessibility check');
    });

    const toastEl = screen.getByRole('alert');
    expect(toastEl).toBeInTheDocument();
  });
});
