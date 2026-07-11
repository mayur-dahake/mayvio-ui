import { forwardRef } from 'react';
import { InputProps } from './Input.types.js';
import 'mayvio-ui/input/css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', size = 'md', error = false, disabled = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        className={`mv-input mv-input--${size} ${error ? 'mv-input--error' : ''} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
