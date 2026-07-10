import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  MouseEvent,
} from 'react';
import {
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
} from './Dropdown.types.js';
import 'mayvio-ui/dropdown/css';

interface DropdownContextValue {
  isOpen: boolean;
  align: 'left' | 'center' | 'right';
  close: () => void;
  toggle: () => void;
}

const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  align: 'left',
  close: () => {},
  toggle: () => {},
});

export function Dropdown({
  align = 'left',
  isOpen: controlledIsOpen,
  defaultIsOpen = false,
  children,
  className = '',
  onOpenChange,
  ...props
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(defaultIsOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const close = useCallback(() => {
    if (controlledIsOpen === undefined) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlledIsOpen, onOpenChange]);

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (controlledIsOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isOpen, controlledIsOpen, onOpenChange]);

  // Close on click outside
  useEffect(() => {
    const handleMouseDown = (e: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [close]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <DropdownContext.Provider value={{ isOpen, align, close, toggle }}>
      <div className={`mv-dropdown ${className}`.trim()} ref={containerRef} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({
  children,
  className = '',
  onClick,
  ...props
}: DropdownTriggerProps) {
  const { toggle, isOpen } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    toggle();
    onClick?.(e);
  };

  return (
    <div
      className={`mv-dropdown-trigger ${className}`.trim()}
      onClick={handleClick}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenu({ children, className = '', ...props }: DropdownMenuProps) {
  const { isOpen, align } = useContext(DropdownContext);

  const alignClass = align !== 'left' ? `mv-dropdown-menu--${align}` : '';
  const openClass = isOpen ? 'mv-dropdown-menu--open' : '';
  const menuClass = `mv-dropdown-menu ${alignClass} ${openClass} ${className}`
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div className={menuClass} role="menu" aria-hidden={!isOpen} {...props}>
      {children}
    </div>
  );
}

export function DropdownItem({
  children,
  className = '',
  onClick,
  disabled,
  ...props
}: DropdownItemProps) {
  const { close } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.(e);
      close();
    }
  };

  return (
    <button
      type="button"
      className={`mv-dropdown-item ${disabled ? 'mv-dropdown-item--disabled' : ''} ${className}`
        .trim()
        .replace(/\s+/g, ' ')}
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
