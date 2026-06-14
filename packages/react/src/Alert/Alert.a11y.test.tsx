import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert Accessibility', () => {
  it('should have role="alert"', () => {
    render(<Alert>Status message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('dismiss button has accessible label', () => {
    render(<Alert dismissible>Msg</Alert>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label');
  });

  it('icon is hidden from screen readers', () => {
    render(<Alert variant="success">Msg</Alert>);
    const icon = document.querySelector('.mv-alert__icon');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });
});
