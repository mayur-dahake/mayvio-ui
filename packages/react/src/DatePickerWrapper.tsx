// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { initDatePicker } from "mayvio-ui/scripts/components/date-picker.js";

/**
 * DatePickerWrapper
 * React integration example for the Mayvio UI Date Picker component.
 *
 * Props:
 *   rangeMode: boolean — enables date range selection mode
 *   onChange: function — called with selected date string(s)
 */
export function DatePickerWrapper({ rangeMode = false, onChange }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const cleanup = initDatePicker(wrapperRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="dp-wrapper" ref={wrapperRef} data-range={rangeMode ? "true" : undefined}>
      <div className="dp-input-group">
        <input
          className="dp-input"
          type="text"
          placeholder={rangeMode ? "Start → End" : "YYYY-MM-DD"}
          readOnly
          aria-label={rangeMode ? "Select date range" : "Select date"}
          aria-haspopup="dialog"
        />
        <button className="dp-trigger" type="button" aria-label="Open calendar">
          📅
        </button>
      </div>
      <div className="dp-popup" role="dialog" aria-label="Calendar" aria-hidden="true"></div>
    </div>
  );
}
