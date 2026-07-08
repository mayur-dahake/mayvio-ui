import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Tabs } from './Tabs.js';

describe('Tabs a11y', () => {
  const items = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  ];

  it('should have proper ARIA attributes', () => {
    render(<Tabs items={items} />);

    // Tablist
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeTruthy();

    // Tabs
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');

    expect(tab1.getAttribute('aria-controls')).toBeTruthy();
    expect(tab1.getAttribute('id')).toBeTruthy();

    // Tabpanels
    const panel1 = screen.getByText('Content 1').closest('div');
    expect(panel1).toHaveAttribute('role', 'tabpanel');
    expect(panel1).toHaveAttribute('aria-labelledby', tab1.getAttribute('id'));
  });
});
