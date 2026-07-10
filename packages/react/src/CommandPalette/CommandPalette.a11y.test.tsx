import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommandPalette } from './CommandPalette.js';
import { vi } from 'vitest';

describe('CommandPalette Component A11y', () => {
  it('has accessible dialog role', () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} commands={[]} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
