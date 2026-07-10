import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MultiSelect } from './MultiSelect.js';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
];

describe('MultiSelect Component A11y', () => {
  it('trigger has correct tab index', () => {
    render(<MultiSelect options={OPTIONS} placeholder="Select" />);
    const trigger = screen.getByText('Select').parentElement;
    expect(trigger).toHaveAttribute('tabindex', '0');
  });

  it('disabled trigger has tabindex -1', () => {
    render(<MultiSelect options={OPTIONS} placeholder="Select" disabled />);
    const trigger = screen.getByText('Select').parentElement;
    expect(trigger).toHaveAttribute('tabindex', '-1');
  });
});
