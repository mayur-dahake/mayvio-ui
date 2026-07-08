import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb.js';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ];

  it('should render breadcrumb items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  it('should apply active class to the last item by default', () => {
    render(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Profile').closest('li');
    expect(lastItem?.classList.contains('mv-breadcrumb__item--active')).toBe(true);
    expect(lastItem?.getAttribute('aria-current')).toBe('page');
  });

  it('should apply active class to items marked as active', () => {
    const customItems = [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings', active: true },
      { label: 'Profile' },
    ];
    render(<Breadcrumb items={customItems} />);
    const activeItem = screen.getByText('Settings').closest('li');
    expect(activeItem?.classList.contains('mv-breadcrumb__item--active')).toBe(true);
  });

  it('should render a custom separator', () => {
    render(<Breadcrumb items={items} separator="-" />);
    const separators = screen.getAllByText('-');
    expect(separators.length).toBe(2);
  });
});
