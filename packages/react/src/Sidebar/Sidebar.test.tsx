import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar.js';

const LINKS = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Settings', href: '/settings' },
];

describe('Sidebar Component', () => {
  it('renders title and links', () => {
    render(<Sidebar title="Mayvio" links={LINKS} />);
    expect(screen.getByText('Mayvio')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onLinkClick when a link is clicked', async () => {
    const user = userEvent.setup();
    const handleLinkClick = vi.fn();

    render(<Sidebar title="Mayvio" links={LINKS} onLinkClick={handleLinkClick} />);

    await user.click(screen.getByText('Settings'));
    expect(handleLinkClick).toHaveBeenCalledWith(LINKS[1]);
  });

  it('toggles collapse', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(
      <Sidebar title="Mayvio" links={LINKS} collapsed={false} onToggleCollapse={handleToggle} />
    );

    const toggleBtn = screen.getByRole('button', { name: /Collapse/i });
    await user.click(toggleBtn);

    expect(handleToggle).toHaveBeenCalledWith(true);
  });
});
