import { useState } from 'react';
import { AlertProps } from './Alert.types.js';

const ICONS: Record<string, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Alert({
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  children,
  className = '',
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 250);
  };

  if (!visible) return null;

  const classes = [
    'mv-alert',
    `mv-alert--${variant}`,
    dismissing ? 'mv-alert--dismissing' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="alert" {...props}>
      <span className="mv-alert__icon" aria-hidden="true">
        {ICONS[variant] ?? 'ℹ'}
      </span>
      <div className="mv-alert__content">
        {title && <div className="mv-alert__title">{title}</div>}
        <div className="mv-alert__message">{children}</div>
      </div>
      {dismissible && (
        <button className="mv-alert__close" aria-label="Dismiss alert" onClick={handleDismiss}>
          ✕
        </button>
      )}
    </div>
  );
}
