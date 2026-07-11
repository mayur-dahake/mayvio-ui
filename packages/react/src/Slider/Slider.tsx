import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { SliderProps } from './Slider.types.js';
import 'mayvio-ui/slider/css';

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ className = '', value = 0, min = 0, max = 100, step = 1, disabled = false, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value);
    const trackRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const calculateValue = useCallback(
      (clientX: number) => {
        if (!trackRef.current) return internalValue;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        const rawValue = percent * (max - min) + min;
        
        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.min(Math.max(steppedValue, min), max);
      },
      [max, min, step, internalValue]
    );

    const updateValue = useCallback(
      (clientX: number) => {
        if (disabled) return;
        const newValue = calculateValue(clientX);
        if (newValue !== internalValue) {
          setInternalValue(newValue);
          if (onChange) onChange(newValue);
        }
      },
      [calculateValue, disabled, internalValue, onChange]
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      isDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      updateValue(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updateValue(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = internalValue;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        newValue = Math.min(internalValue + step, max);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        newValue = Math.max(internalValue - step, min);
      }
      
      if (newValue !== internalValue) {
        setInternalValue(newValue);
        if (onChange) onChange(newValue);
      }
    };

    const percentage = ((internalValue - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={`mv-slider-wrapper ${disabled ? 'mv-slider-wrapper--disabled' : ''} ${className}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        {...props}
      >
        <div className="mv-slider-track" ref={trackRef}>
          <div className="mv-slider-range" style={{ width: `${percentage}%` }}></div>
        </div>
        <div
          className="mv-slider-thumb"
          style={{ left: `${percentage}%` }}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={internalValue}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
        ></div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
