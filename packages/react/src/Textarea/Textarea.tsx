import { forwardRef, useEffect, useRef } from 'react';
import { TextareaProps } from './Textarea.types.js';
import 'mayvio-ui/textarea/css';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error = false, disabled = false, autoResize = false, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = (node: HTMLTextAreaElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleAutoResize = () => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = internalRef.current.scrollHeight + 'px';
      }
    };

    useEffect(() => {
      handleAutoResize();
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleAutoResize();
      onChange?.(e);
    };

    return (
      <textarea
        ref={setRefs}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        className={`mv-textarea ${error ? 'mv-textarea--error' : ''} ${className}`}
        onChange={handleChange}
        style={autoResize ? { overflow: 'hidden', resize: 'none' } : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
