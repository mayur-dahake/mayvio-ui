import { HTMLAttributes, ReactNode } from 'react';

export interface ModalConfig {
  size?: 'sm' | 'md' | 'lg' | 'full';
  isOpen?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, ModalConfig {
  children?: ReactNode;

  /**
   * Called when the modal requests to be closed (e.g. click outside, escape key, close button)
   */
  onClose?: () => void;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;

  /**
   * Whether to show the default close button
   * @default true
   */
  showCloseButton?: boolean;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
