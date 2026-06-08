// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { initMultiSelect } from "mayvio-ui/scripts/components/multi-select.js";

/**
 * MultiSelectWrapper
 * React integration example for the Mayvio UI Multi-Select Dropdown component.
 *
 * Usage:
 *   <MultiSelectWrapper onChange={(selected) => console.log(selected)} />
 */
export function MultiSelectWrapper({ onChange }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const cleanup = initMultiSelect(wrapperRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="ms-wrapper" ref={wrapperRef} aria-expanded="false" aria-haspopup="listbox" aria-label="Tech stack selector">
      <div className="ms-trigger" role="combobox" tabIndex={0} aria-label="Open multi-select">
        <div className="ms-tags">
          <span className="ms-placeholder">Choose technologies...</span>
          <span className="ms-count" hidden>0</span>
        </div>
      </div>
      <div className="ms-dropdown" role="listbox" aria-multiselectable="true" aria-label="Technology options">
        <div className="ms-search-bar">
          <input className="ms-search" type="search" placeholder="Search technologies..." aria-label="Search options" autoComplete="off" />
        </div>
        <div className="ms-toolbar">
          <button className="ms-select-all" type="button">Select All</button>
          <button className="ms-clear-all" type="button" disabled>Clear All</button>
        </div>
        <ul className="ms-list" role="presentation"></ul>
      </div>
    </div>
  );
}
