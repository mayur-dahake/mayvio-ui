import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion } from './Accordion.js';

describe('Accordion', () => {
  const items = [
    { id: 'item1', title: 'Item 1', content: 'Content 1' },
    { id: 'item2', title: 'Item 2', content: 'Content 2' },
    { id: 'item3', title: 'Item 3', content: 'Content 3', disabled: true },
  ];

  it('renders correctly with no expanded items by default', () => {
    render(<Accordion items={items} />);

    const trigger1 = screen.getByRole('button', { name: 'Item 1' });
    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('Content 1').closest('.mv-accordion__content')).toHaveAttribute(
      'hidden'
    );
  });

  it('respects defaultExpandedIds', () => {
    render(<Accordion items={items} defaultExpandedIds={['item2']} />);

    const trigger2 = screen.getByRole('button', { name: 'Item 2' });
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 2').closest('.mv-accordion__content')).not.toHaveAttribute(
      'hidden'
    );
  });

  it('toggles item on click', () => {
    render(<Accordion items={items} />);

    const trigger1 = screen.getByRole('button', { name: 'Item 1' });

    // Expand
    fireEvent.click(trigger1);
    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Content 1').closest('.mv-accordion__content')).not.toHaveAttribute(
      'hidden'
    );

    // Collapse
    fireEvent.click(trigger1);
    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('Content 1').closest('.mv-accordion__content')).toHaveAttribute(
      'hidden'
    );
  });

  it('closes other items when allowMultiple is false', () => {
    render(<Accordion items={items} defaultExpandedIds={['item1']} />);

    const trigger1 = screen.getByRole('button', { name: 'Item 1' });
    const trigger2 = screen.getByRole('button', { name: 'Item 2' });

    fireEvent.click(trigger2);

    expect(trigger1.getAttribute('aria-expanded')).toBe('false');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('allows multiple expanded items when allowMultiple is true', () => {
    render(<Accordion items={items} allowMultiple defaultExpandedIds={['item1']} />);

    const trigger1 = screen.getByRole('button', { name: 'Item 1' });
    const trigger2 = screen.getByRole('button', { name: 'Item 2' });

    fireEvent.click(trigger2);

    expect(trigger1.getAttribute('aria-expanded')).toBe('true');
    expect(trigger2.getAttribute('aria-expanded')).toBe('true');
  });

  it('does not toggle if disabled', () => {
    render(<Accordion items={items} />);

    const trigger3 = screen.getByRole('button', { name: 'Item 3' });
    fireEvent.click(trigger3);

    expect(trigger3.getAttribute('aria-expanded')).toBe('false');
  });

  it('calls onChange when item is toggled', () => {
    const handleChange = vi.fn();
    render(<Accordion items={items} onChange={handleChange} />);

    const trigger2 = screen.getByRole('button', { name: 'Item 2' });
    fireEvent.click(trigger2);

    expect(handleChange).toHaveBeenCalledWith(['item2']);
  });

  it('operates in controlled mode', () => {
    const { rerender } = render(<Accordion items={items} expandedIds={['item1']} />);

    expect(screen.getByRole('button', { name: 'Item 1' }).getAttribute('aria-expanded')).toBe(
      'true'
    );

    rerender(<Accordion items={items} expandedIds={['item2']} />);
    expect(screen.getByRole('button', { name: 'Item 2' }).getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(screen.getByRole('button', { name: 'Item 1' }).getAttribute('aria-expanded')).toBe(
      'false'
    );
  });
});
