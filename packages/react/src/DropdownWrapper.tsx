// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

/**
 * React Wrapper for Mayvio UI Dropdown component.
 * Supports searchable single and multi-select modes with full keyboard accessibility.
 * 
 * Props:
 * - options (Array<{value: string, label: string}>): List of selectable values.
 * - value (string | Array<string>): Currently selected value(s).
 * - isMulti (boolean): Enable multi-select chips.
 * - onChange (function): Callback when value list changes.
 * - placeholder (string): Trigger button placeholder.
 */
export function DropdownWrapper({
  options = [],
  value,
  isMulti = false,
  onChange,
  placeholder = "Select option..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Compute selected items based on props
  const selectedItems = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  // Filter options based on search query
  const visibleOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside listener to close menu
  useEffect(() => {
    const handleOuterClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("click", handleOuterClick);
    return () => document.removeEventListener("click", handleOuterClick);
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setSearchQuery("");
    setFocusedIndex(-1);
  };

  const handleSelect = (option) => {
    if (isMulti) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(option.value);
      const nextValues = isSelected
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onChange(nextValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
      setSearchQuery("");
      setFocusedIndex(-1);
    }
  };

  const handleRemoveChip = (e, val) => {
    e.stopPropagation();
    const currentValues = Array.isArray(value) ? value : [];
    onChange(currentValues.filter((v) => v !== val));
  };

  // Keyboard navigation inside options list
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, visibleOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < visibleOptions.length) {
        handleSelect(visibleOptions[focusedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
      setFocusedIndex(-1);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? "open" : ""}`}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="dropdown-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span
          className={`dropdown-label ${
            isMulti
              ? !selectedItems.length ? "placeholder" : ""
              : !selectedItems ? "placeholder" : ""
          }`}
        >
          {isMulti
            ? selectedItems.length
              ? `${selectedItems.length} selected`
              : placeholder
            : selectedItems
            ? selectedItems.label
            : placeholder}
        </span>
        <span className="dropdown-chevron" aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox" aria-multiselectable={isMulti}>
          <div className="dropdown-search">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              aria-label="Search options"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFocusedIndex(-1); // reset selection focus
              }}
            />
          </div>
          <ul className="dropdown-options">
            {visibleOptions.length > 0 ? (
              visibleOptions.map((opt, index) => {
                const isSelected = isMulti
                  ? Array.isArray(value) && value.includes(opt.value)
                  : value === opt.value;
                const isFocused = index === focusedIndex;

                return (
                  <li
                    key={opt.value}
                    className={`dropdown-option ${isSelected ? "selected" : ""} ${
                      isFocused ? "focused" : ""
                    }`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                  >
                    <span className="check">✓</span>
                    {opt.label}
                  </li>
                );
              })
            ) : (
              <li className="dropdown-option disabled" style={{ color: "var(--text-muted)", pointerEvents: "none" }}>
                No options found
              </li>
            )}
          </ul>
        </div>
      )}

      {isMulti && selectedItems.length > 0 && (
        <div className="dropdown-chips">
          {selectedItems.map((s) => (
            <span key={s.value} className="dropdown-chip">
              {s.label}
              <button
                type="button"
                aria-label={`Remove ${s.label}`}
                onClick={(e) => handleRemoveChip(e, s.value)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
