import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  animation?: 'shimmer' | 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}
