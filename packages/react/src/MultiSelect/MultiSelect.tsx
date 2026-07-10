import { useState, useRef, useEffect, MouseEvent } from 'react';
import { MultiSelectProps } from './MultiSelect.types.js';
import 'mayvio-ui/multiselect/css';

export function MultiSelect({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  searchable = false,
  placeholder = 'Select options...',
  emptyText = 'No options found.',
  className = '',
  renderTag,
  ...props
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue || []);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValues = isControlled ? value : internalValue;

  const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));
  const filteredOptions = searchable
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  useEffect(() => {
    const handleOutsideClick = (e: globalThis.MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleToggleOption = (optionValue: string | number) => {
    const newValue = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleRemoveTag = (e: MouseEvent, optionValue: string | number) => {
    e.stopPropagation();
    handleToggleOption(optionValue);
  };

  return (
    <div
      className={`mv-multiselect ${isOpen ? 'mv-multiselect--open' : ''} ${className}`}
      ref={containerRef}
      {...props}
    >
      <div
        className={`mv-multiselect-trigger ${disabled ? 'mv-multiselect-trigger--disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          }
        }}
      >
        {selectedOptions.length === 0 ? (
          <span className="mv-multiselect-placeholder">{placeholder}</span>
        ) : (
          selectedOptions.map((opt) =>
            renderTag ? (
              renderTag(opt, () => handleToggleOption(opt.value))
            ) : (
              <span
                key={opt.value}
                className="mv-badge mv-badge--md mv-badge--default"
                style={{ gap: '0.25rem' }}
              >
                {opt.label}
                <button
                  type="button"
                  aria-label={`Remove ${opt.label}`}
                  onClick={(e) => handleRemoveTag(e, opt.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </span>
            )
          )
        )}
      </div>

      {isOpen && (
        <div className="mv-multiselect-menu" role="listbox">
          {searchable && (
            <div className="mv-multiselect-search" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                className="mv-multiselect-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="mv-multiselect-empty">{emptyText}</div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  className={`mv-multiselect-option ${isSelected ? 'mv-multiselect-option--selected' : ''} ${opt.disabled ? 'mv-multiselect-option--disabled' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!opt.disabled) {
                      handleToggleOption(opt.value);
                    }
                  }}
                >
                  {/* Basic check icon for selected items */}
                  <svg
                    style={{ visibility: isSelected ? 'visible' : 'hidden' }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {opt.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
