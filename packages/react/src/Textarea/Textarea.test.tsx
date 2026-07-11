import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter description" />);
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    render(<Textarea placeholder="Type here" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText('Type here');
    await userEvent.type(textarea, 'hello world');
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('hello world');
  });

  it('applies error class when error prop is true', () => {
    render(<Textarea placeholder="Error textarea" error />);
    const textarea = screen.getByPlaceholderText('Error textarea');
    expect(textarea).toHaveClass('mv-textarea--error');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea placeholder="Disabled textarea" disabled />);
    const textarea = screen.getByPlaceholderText('Disabled textarea');
    expect(textarea).toBeDisabled();
  });

});
