import { ButtonProps } from './Button.types.js';

export function Button({
  variant = 'primary',
  size = 'md',
  color = 'primary',
  shape = 'rectangle',
  disabled = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'mv-button',
    `mv-button--${variant}`,
    `mv-button--${size}`,
    color !== 'primary' ? `mv-button--${color}` : '',
    shape !== 'rectangle' ? `mv-button--${shape}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
