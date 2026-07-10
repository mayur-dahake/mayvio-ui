// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './Dropdown';

describe('Dropdown Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children correctly', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Trigger</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('is closed by default', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const menu = screen.getByTestId('menu');
    expect(menu.className).not.toContain('mv-dropdown-menu--open');
  });

  it('opens when trigger is clicked', () => {
    render(
      <Dropdown>
        <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByTestId('trigger');
    const menu = screen.getByTestId('menu');

    fireEvent.click(trigger);
    expect(menu.className).toContain('mv-dropdown-menu--open');
  });

  it('closes when trigger is clicked again', () => {
    render(
      <Dropdown>
        <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByTestId('trigger');
    const menu = screen.getByTestId('menu');

    fireEvent.click(trigger);
    expect(menu.className).toContain('mv-dropdown-menu--open');

    fireEvent.click(trigger);
    expect(menu.className).not.toContain('mv-dropdown-menu--open');
  });

  it('closes when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown>
          <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
          <DropdownMenu data-testid="menu">
            <DropdownItem>Item 1</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );

    const trigger = screen.getByTestId('trigger');
    const menu = screen.getByTestId('menu');
    const outside = screen.getByTestId('outside');

    fireEvent.click(trigger);
    expect(menu.className).toContain('mv-dropdown-menu--open');

    fireEvent.mouseDown(outside);
    expect(menu.className).not.toContain('mv-dropdown-menu--open');
  });

  it('closes when an item is clicked', () => {
    render(
      <Dropdown>
        <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem data-testid="item">Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const trigger = screen.getByTestId('trigger');
    const menu = screen.getByTestId('menu');
    const item = screen.getByTestId('item');

    fireEvent.click(trigger);
    expect(menu.className).toContain('mv-dropdown-menu--open');

    fireEvent.click(item);
    expect(menu.className).not.toContain('mv-dropdown-menu--open');
  });

  it('applies align class to menu', () => {
    render(
      <Dropdown align="right">
        <DropdownTrigger>Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

    const menu = screen.getByTestId('menu');
    expect(menu.className).toContain('mv-dropdown-menu--right');
  });
});
