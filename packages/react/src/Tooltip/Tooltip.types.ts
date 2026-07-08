import React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement;
}
