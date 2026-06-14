import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  outline?: boolean;
  children?: React.ReactNode;
}
