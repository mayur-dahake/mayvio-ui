// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { initDashboardWidgets } from "mayvio-ui/scripts/components/dashboard-widget.js";

/**
 * DashboardWidgetGrid
 * React wrapper container managing draggable grid rearrangements.
 */
export function DashboardWidgetGrid({ children, storageKey, className = "" }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      initDashboardWidgets(gridRef.current, { storageKey });
    }
  }, []);

  return (
    <div ref={gridRef} className={`widget-grid ${className}`}>
      {children}
    </div>
  );
}

/**
 * DashboardWidget
 * Card panel containing drag headers, titles, folding contents, and close actions.
 */
export function DashboardWidget({
  id,
  title,
  children,
  defaultCollapsed = false,
  dismissible = true,
  className = ""
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [dismissed, setDismissed] = useState(false);

  const handleCollapse = (e) => {
    e.stopPropagation();
    setCollapsed(!collapsed);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div id={id} className={`widget ${collapsed ? "collapsed" : ""} ${className}`}>
      <div className="widget-header">
        <div className="widget-header-left">
          <span className="widget-drag-handle" title="Drag to rearrange">☰</span>
          <h3 className="widget-title">{title}</h3>
        </div>
        <div className="widget-actions">
          <button
            className="widget-btn widget-btn-collapse"
            onClick={handleCollapse}
            aria-expanded={!collapsed}
            aria-label="Collapse widget"
            type="button"
          >
            ▼
          </button>
          {dismissible && (
            <button
              className="widget-btn widget-btn-close"
              onClick={handleClose}
              aria-label="Close widget"
              type="button"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="widget-content">
        <div className="widget-content-inner">{children}</div>
      </div>
    </div>
  );
}
