import { forwardRef } from 'react';
import { SwitchProps } from './Switch.types.js';
import 'mayvio-ui/switch/css';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = '', label, disabled = false, checked, onChange, ...props }, ref) => {
    return (
      <label className={`mv-switch-wrapper ${disabled ? 'mv-switch-wrapper--disabled' : ''} ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="mv-switch-input"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <div className="mv-switch-control" aria-hidden="true">
          <div className="mv-switch-thumb"></div>
        </div>
        {label && <span className="mv-switch-label">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
