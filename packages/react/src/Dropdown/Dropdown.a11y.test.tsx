// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './Dropdown';

describe('Dropdown Accessibility', () => {
  it('trigger should have aria-haspopup and aria-expanded', () => {
    render(
      <Dropdown>
        <DropdownTrigger data-testid="trigger">Options</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Action 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('menu should have role="menu"', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem>Action 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const menu = screen.getByTestId('menu');
    expect(menu).toHaveAttribute('role', 'menu');
  });

  it('items should have role="menuitem"', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem data-testid="item">Action 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveAttribute('role', 'menuitem');
  });
});
