import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar.js';

describe('Sidebar Component A11y', () => {
  it('has accessible buttons', () => {
    render(<Sidebar links={[]} />);
    expect(screen.getByRole('button', { name: /Collapse/i })).toBeInTheDocument();
  });
});
