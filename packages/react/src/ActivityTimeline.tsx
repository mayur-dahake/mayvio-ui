// @ts-nocheck
import React from "react";

/**
 * ActivityTimeline
 * React wrapper for Mayvio UI vertical status event flows.
 */
export function ActivityTimeline({ children, className = "" }) {
  return (
    <div className={`timeline ${className}`}>
      {children}
    </div>
  );
}

/**
 * ActivityTimelineItem
 * Single step inside the timeline.
 */
export function ActivityTimelineItem({
  status = "info",
  time,
  title,
  children,
  className = ""
}) {
  return (
    <div className={`timeline-item ${className}`}>
      <div className={`timeline-badge ${status}`} aria-hidden="true" />
      <div className="timeline-content">
        <div className="timeline-header">
          <h4 className="timeline-title">{title}</h4>
          {time && <span className="timeline-time">{time}</span>}
        </div>
        {children && <p className="timeline-desc">{children}</p>}
      </div>
    </div>
  );
}
