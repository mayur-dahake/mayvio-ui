import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders children correctly', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('applies default base class', () => {
    render(<Alert data-testid="a">Msg</Alert>);
    expect(screen.getByTestId('a')).toHaveClass('mv-alert');
  });

  it('applies variant class', () => {
    render(
      <Alert variant="success" data-testid="a">
        Msg
      </Alert>
    );
    expect(screen.getByTestId('a')).toHaveClass('mv-alert--success');
  });

  it('renders title when provided', () => {
    render(<Alert title="My Title">Body</Alert>);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('does not render close button when not dismissible', () => {
    render(<Alert>Msg</Alert>);
    expect(screen.queryByRole('button', { name: /dismiss/i })).toBeNull();
  });

  it('renders close button when dismissible', () => {
    render(<Alert dismissible>Msg</Alert>);
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
  });

  it('calls onDismiss when close button clicked', () => {
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Msg
      </Alert>
    );
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    // wait for timeout
    return new Promise((resolve) =>
      setTimeout(() => {
        expect(onDismiss).toHaveBeenCalledOnce();
        resolve(undefined);
      }, 300)
    );
  });

  it('hides after dismiss', () => {
    render(
      <Alert dismissible data-testid="a">
        Msg
      </Alert>
    );
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    return new Promise((resolve) =>
      setTimeout(() => {
        expect(screen.queryByTestId('a')).toBeNull();
        resolve(undefined);
      }, 300)
    );
  });

  it('has role="alert" for accessibility', () => {
    render(<Alert>Msg</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
