import { forwardRef, useState, useEffect } from 'react';
import { RadioGroupProps } from './RadioGroup.types.js';
import 'mayvio-ui/radiogroup/css';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = '', orientation = 'vertical', options, name, value, onChange, error = false, disabled = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(value);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleChange = (val: string) => {
      if (disabled) return;
      setInternalValue(val);
      if (onChange) onChange(val);
    };

    return (
      <div 
        ref={ref} 
        className={`mv-radiogroup ${orientation === 'horizontal' ? 'mv-radiogroup--horizontal' : ''} ${className}`}
        role="radiogroup"
      >
        {options.map((opt) => (
          <label 
            key={opt.value} 
            className={`mv-radio-wrapper ${disabled || opt.disabled ? 'mv-radio-wrapper--disabled' : ''} ${error ? 'mv-radio-wrapper--error' : ''}`}
          >
            <input
              type="radio"
              className="mv-radio-input"
              name={name}
              value={opt.value}
              checked={internalValue === opt.value}
              disabled={disabled || opt.disabled}
              onChange={() => handleChange(opt.value)}
              {...props}
            />
            <div className="mv-radio-control" aria-hidden="true">
              <div className="mv-radio-icon"></div>
            </div>
            <span className="mv-radio-label">{opt.label}</span>
          </label>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
