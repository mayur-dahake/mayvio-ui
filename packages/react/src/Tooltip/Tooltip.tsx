import { useState, useRef, useId } from 'react';
import { TooltipProps } from './Tooltip.types.js';

export function Tooltip({
  content,
  placement = 'top',
  delay = 0,
  children,
  ...props
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, delay);
    } else {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const child = children;
  const triggerEl = {
    ...child,
    props: {
      ...child.props,
      'aria-describedby': id,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleMouseEnter,
      onBlur: handleMouseLeave,
    },
  };

  return (
    <div className="mv-tooltip-container" {...props}>
      {triggerEl}
      <div
        id={id}
        className={`mv-tooltip mv-tooltip--${placement}${visible ? ' mv-tooltip--visible' : ''}`}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
