import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette } from './CommandPalette.js';

const COMMANDS = [
  { id: '1', label: 'Create Project', group: 'Actions' },
  { id: '2', label: 'Delete Project', group: 'Actions' },
  { id: '3', label: 'Settings', group: 'Navigation' },
];

describe('CommandPalette Component', () => {
  it('does not render when closed', () => {
    render(<CommandPalette isOpen={false} onClose={vi.fn()} commands={COMMANDS} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders commands when open', () => {
    render(<CommandPalette isOpen={true} onClose={vi.fn()} commands={COMMANDS} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create Project')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument(); // Group label
  });

  it('filters commands based on search', async () => {
    const user = userEvent.setup();
    render(<CommandPalette isOpen={true} onClose={vi.fn()} commands={COMMANDS} />);

    const input = screen.getByPlaceholderText('Search commands...');
    await user.type(input, 'set');

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.queryByText('Create Project')).not.toBeInTheDocument();
  });

  it('calls onSelect when a command is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleClose = vi.fn();

    render(
      <CommandPalette
        isOpen={true}
        onClose={handleClose}
        onSelect={handleSelect}
        commands={COMMANDS}
      />
    );

    await user.click(screen.getByText('Settings'));

    expect(handleSelect).toHaveBeenCalledWith(COMMANDS[2]);
    expect(handleClose).toHaveBeenCalled(); // typically closes on select
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    const { container } = render(
      <CommandPalette isOpen={true} onClose={handleClose} commands={COMMANDS} />
    );

    // click the overlay (first child usually)
    const overlay = container.querySelector('.mv-commandpalette-overlay');
    await user.click(overlay!);

    expect(handleClose).toHaveBeenCalled();
  });
});
