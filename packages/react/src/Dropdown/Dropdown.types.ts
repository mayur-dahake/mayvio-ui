import { HTMLAttributes, ReactNode, ButtonHTMLAttributes } from 'react';

export interface DropdownConfig {
  align?: 'left' | 'center' | 'right';
  isOpen?: boolean;
  defaultIsOpen?: boolean;
}

export interface DropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'align'>, DropdownConfig {
  children?: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}

export interface DropdownTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
