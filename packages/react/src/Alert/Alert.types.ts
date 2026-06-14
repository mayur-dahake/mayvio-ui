import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}
