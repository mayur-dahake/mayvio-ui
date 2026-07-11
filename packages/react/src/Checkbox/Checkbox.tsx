import { forwardRef, useEffect, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types.js';
import 'mayvio-ui/checkbox/css';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, error = false, disabled = false, indeterminate = false, checked, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement | null>(null);

    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label className={`mv-checkbox-wrapper ${disabled ? 'mv-checkbox-wrapper--disabled' : ''} ${error ? 'mv-checkbox-wrapper--error' : ''} ${className}`}>
        <input
          ref={setRefs}
          type="checkbox"
          className="mv-checkbox-input"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <div className="mv-checkbox-control" aria-hidden="true">
          <svg className="mv-checkbox-icon" viewBox="0 0 15 15">
            {indeterminate ? (
              <path d="M4 7.5H11" strokeWidth="2" />
            ) : (
              <path d="M3.5 7.5L6 10L11.5 4" strokeWidth="2" />
            )}
          </svg>
        </div>
        {label && <span className="mv-checkbox-label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
