import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs.js';

describe('Tabs', () => {
  const items = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3', disabled: true },
  ];

  it('renders correctly with default active tab', () => {
    render(<Tabs items={items} />);

    // Tab 1 should be active by default
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab1.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Content 1').closest('div')).not.toHaveAttribute('hidden');
    expect(screen.getByText('Content 2').closest('div')).toHaveAttribute('hidden');
  });

  it('respects defaultActiveId', () => {
    render(<Tabs items={items} defaultActiveId="tab2" />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tab2.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Content 2').closest('div')).not.toHaveAttribute('hidden');
  });

  it('changes tab on click', () => {
    render(<Tabs items={items} />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(tab2);

    expect(tab2.getAttribute('aria-selected')).toBe('true');
    expect(screen.getByText('Content 2').closest('div')).not.toHaveAttribute('hidden');
  });

  it('does not change tab if disabled', () => {
    render(<Tabs items={items} />);

    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
    fireEvent.click(tab3);

    expect(tab3.getAttribute('aria-selected')).toBe('false');
    expect(screen.getByText('Content 3').closest('div')).toHaveAttribute('hidden');
  });

  it('calls onChange when tab is clicked', () => {
    const handleChange = vi.fn();
    render(<Tabs items={items} onChange={handleChange} />);

    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.click(tab2);

    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('operates in controlled mode', () => {
    const { rerender } = render(<Tabs items={items} activeId="tab1" />);

    expect(screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected')).toBe('true');

    rerender(<Tabs items={items} activeId="tab2" />);
    expect(screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected')).toBe('true');
  });
});
