import { BadgeProps } from './Badge.types.js';

export function Badge({
  variant = 'info',
  size = 'md',
  dot = false,
  outline = false,
  children,
  className = '',
  ...props
}: BadgeProps) {
  const classes = [
    'mv-badge',
    `mv-badge--${variant}`,
    `mv-badge--${size}`,
    dot ? 'mv-badge--dot' : '',
    outline ? 'mv-badge--outline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
