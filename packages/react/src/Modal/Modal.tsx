import { useEffect, useRef, MouseEvent, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Modal.types.js';
import 'mayvio-ui/modal/css';

const ModalContext = createContext<{ onClose?: () => void }>({});

export function Modal({
  size = 'md',
  isOpen = false,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  onClose,
  className = '',
  children,
  ...props
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEscape && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current && closeOnOutsideClick && onClose) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  const modalClass = `mv-modal mv-modal--${size} ${className}`.trim();
  const overlayClass = `mv-modal-overlay ${isOpen ? 'mv-modal-overlay--open' : ''}`;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        className={overlayClass}
        onMouseDown={handleOverlayClick}
        ref={overlayRef}
        aria-hidden={!isOpen}
      >
        <div className={modalClass} role="dialog" aria-modal="true" {...props}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

export function ModalHeader({
  children,
  showCloseButton = true,
  className = '',
  ...props
}: ModalHeaderProps) {
  const { onClose } = useContext(ModalContext);

  return (
    <div className={`mv-modal-header ${className}`.trim()} {...props}>
      <div className="mv-modal-title">{children}</div>
      {showCloseButton && (
        <button className="mv-modal-close" aria-label="Close modal" type="button" onClick={onClose}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className = '', ...props }: ModalBodyProps) {
  return (
    <div className={`mv-modal-body ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '', ...props }: ModalFooterProps) {
  return (
    <div className={`mv-modal-footer ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
