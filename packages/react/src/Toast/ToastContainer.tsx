import { useState, useEffect } from 'react';
import { ToastContainerProps, ToastItem } from './Toast.types.js';
import { toast } from './toast-service.js';

export function ToastContainer({ placement = 'top-right' }: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return toast.subscribe((updatedToasts) => {
      setToasts(updatedToasts);
    });
  }, []);

  return (
    <div
      className={`mv-toast-container mv-toast-container--${placement}`}
      data-testid="toast-container"
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          className={`mv-toast mv-toast--${item.type || 'info'}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="mv-toast__content">
            {item.title && <div className="mv-toast__title">{item.title}</div>}
            <div className="mv-toast__message">{item.message}</div>
          </div>
          <button
            type="button"
            className="mv-toast__close"
            onClick={() => toast.dismiss(item.id)}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
