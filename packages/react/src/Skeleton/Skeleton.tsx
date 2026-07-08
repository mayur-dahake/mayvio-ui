import React from 'react';
import { SkeletonProps } from './Skeleton.types.js';

export function Skeleton({
  variant = 'text',
  animation = 'shimmer',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const classes = [
    'mv-skeleton',
    `mv-skeleton--${variant}`,
    animation !== 'none' ? `mv-skeleton--${animation}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const formatSize = (val?: string | number) => {
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  const inlineStyles: React.CSSProperties = {
    ...style,
    width: formatSize(width),
    height: formatSize(height),
  };

  return <div className={classes} style={inlineStyles} aria-busy="true" {...props} />;
}
