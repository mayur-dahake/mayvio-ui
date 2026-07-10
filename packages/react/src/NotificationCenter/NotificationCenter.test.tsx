import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationCenter } from './NotificationCenter.js';

const NOTIFICATIONS = [
  { id: '1', title: 'New message', unread: true },
  { id: '2', title: 'System update', status: 'info' as const },
];

describe('NotificationCenter Component', () => {
  it('renders trigger with badge count', () => {
    render(<NotificationCenter notifications={NOTIFICATIONS} />);
    const trigger = screen.getByRole('button', { name: /Notifications/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // 1 unread
  });

  it('opens popup on click', async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={NOTIFICATIONS} />);

    expect(screen.queryByText('New message')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Notifications/i }));

    expect(screen.getByText('New message')).toBeInTheDocument();
    expect(screen.getByText('System update')).toBeInTheDocument();
  });

  it('calls onMarkAllAsRead', async () => {
    const user = userEvent.setup();
    const handleMark = vi.fn();

    render(<NotificationCenter notifications={NOTIFICATIONS} onMarkAllAsRead={handleMark} />);

    await user.click(screen.getByRole('button', { name: /Notifications/i }));
    await user.click(screen.getByText('Mark all as read'));

    expect(handleMark).toHaveBeenCalled();
  });
});
