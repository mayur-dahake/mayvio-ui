import { ProgressBarProps } from './ProgressBar.types.js';

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  indeterminate = false,
  className = '',
  ...props
}: ProgressBarProps) {
  const classes = ['mv-progress-bar', `mv-progress-bar--${size}`, className]
    .filter(Boolean)
    .join(' ');

  const percentage = indeterminate ? undefined : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={percentage !== undefined ? value : undefined}
      {...props}
    >
      <div
        className={`mv-progress-bar__track${
          indeterminate ? ' mv-progress-bar__track--indeterminate' : ''
        }`}
      >
        <div
          className="mv-progress-bar__fill"
          style={{ width: percentage !== undefined ? `${percentage}%` : undefined }}
          data-testid="progress-fill"
        />
      </div>
    </div>
  );
}
