import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Breadcrumb } from './Breadcrumb.js';

describe('Breadcrumb a11y', () => {
  it('should have correct aria-labels', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Profile' }];
    render(<Breadcrumb items={items} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');

    const profileLi = screen.getByText('Profile').closest('li');
    expect(profileLi).toHaveAttribute('aria-current', 'page');
  });
});
