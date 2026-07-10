import { useState, useRef, useEffect, MouseEvent } from 'react';
import { DatePickerProps } from './DatePicker.types.js';
import 'mayvio-ui/datepicker/css';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({
  value,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = 'Select date',
  minDate,
  maxDate,
  className = '',
  ...props
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(value || defaultValue || new Date());

  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalValue;

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

  useEffect(() => {
    if (selectedDate && !isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setViewDate(selectedDate);
    }
  }, [selectedDate, isOpen]);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handlePrevMonth = (e: MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    if (disabled) return;

    // Check min/max bounds
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    if (!isControlled) {
      setInternalValue(date);
    }
    onChange?.(date);
    setIsOpen(false);
  };

  // Generate calendar grid
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const days = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month leading days (to fill 6 rows, 42 cells total)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (d: Date) => {
    if (!selectedDate) return false;
    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isDisabled = (d: Date) => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const formattedDate = selectedDate
    ? `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    : placeholder;

  return (
    <div
      className={`mv-datepicker ${isOpen ? 'mv-datepicker--open' : ''} ${className}`}
      ref={containerRef}
      {...props}
    >
      <button
        type="button"
        className={`mv-datepicker-trigger ${disabled ? 'mv-datepicker-trigger--disabled' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-label={selectedDate ? `Selected date: ${formattedDate}` : 'Choose date'}
      >
        <span className={!selectedDate ? 'mv-datepicker-placeholder' : ''}>{formattedDate}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      {isOpen && (
        <div className="mv-datepicker-popup" role="dialog" aria-label="Calendar">
          <div className="mv-datepicker-header">
            <button
              type="button"
              className="mv-datepicker-nav-btn"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="mv-datepicker-current-month" aria-live="polite">
              {MONTH_NAMES[month]} {year}
            </div>
            <button
              type="button"
              className="mv-datepicker-nav-btn"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="mv-datepicker-grid" role="grid">
            {DAY_NAMES.map((name) => (
              <div
                key={name}
                className="mv-datepicker-day-name"
                role="columnheader"
                aria-label={name}
              >
                {name}
              </div>
            ))}

            {days.map((dayObj, i) => {
              const _isSelected = isSelected(dayObj.date);
              const _isToday = isToday(dayObj.date);
              const _isDisabled = isDisabled(dayObj.date);

              let classes = 'mv-datepicker-cell';
              if (!dayObj.isCurrentMonth) classes += ' mv-datepicker-cell--outside-month';
              if (_isSelected) classes += ' mv-datepicker-cell--selected';
              else if (_isToday) classes += ' mv-datepicker-cell--today';
              if (_isDisabled) classes += ' mv-datepicker-cell--disabled';

              return (
                <div
                  key={i}
                  className={classes}
                  role="gridcell"
                  aria-selected={_isSelected}
                  aria-disabled={_isDisabled}
                  onClick={() => handleSelectDate(dayObj.date)}
                >
                  {dayObj.date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
