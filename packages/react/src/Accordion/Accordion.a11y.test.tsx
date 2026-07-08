import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Accordion } from './Accordion.js';

describe('Accordion a11y', () => {
  const items = [
    { id: 'item1', title: 'Item 1', content: 'Content 1' },
    { id: 'item2', title: 'Item 2', content: 'Content 2' },
  ];

  it('should have proper ARIA attributes', () => {
    render(<Accordion items={items} defaultExpandedIds={['item1']} />);

    // Headers / Triggers
    const trigger1 = screen.getByRole('button', { name: 'Item 1' });
    const trigger2 = screen.getByRole('button', { name: 'Item 2' });

    expect(trigger1).toHaveAttribute('aria-expanded', 'true');
    expect(trigger2).toHaveAttribute('aria-expanded', 'false');

    expect(trigger1.getAttribute('aria-controls')).toBeTruthy();
    expect(trigger1.getAttribute('id')).toBeTruthy();

    // Content Regions
    const panel1 = screen.getByText('Content 1').closest('.mv-accordion__content');
    expect(panel1).toHaveAttribute('role', 'region');
    expect(panel1).toHaveAttribute('aria-labelledby', trigger1.getAttribute('id'));
  });
});
