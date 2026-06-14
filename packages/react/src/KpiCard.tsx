// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { initKpiCards } from "mayvio-ui/scripts/components/kpi-card.js";

/**
 * KpiCard
 * React wrapper for Mayvio UI KPI Card with viewport-triggered animated counter.
 *
 * Props:
 * - title: string, title of the card
 * - value: number, target value for counter animation
 * - icon: ReactNode, optional icon
 * - trend: string, trend percentage (e.g. '12%')
 * - trendDirection: 'up' | 'down', colors and styles the trend indicator
 * - footer: string, footer description
 * - duration: animation duration in milliseconds
 * - decimals: number of decimal places
 * - prefix: string prefix (e.g. '$')
 * - suffix: string suffix (e.g. '%')
 * - className: custom class names
 */
export function KpiCard({
  title,
  value,
  icon,
  trend,
  trendDirection,
  footer,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = ""
}) {
  const valueRef = useRef(null);

  useEffect(() => {
    if (valueRef.current) {
      // Re-trigger viewport animation on value update
      initKpiCards(valueRef.current);
    }
  }, [value]);

  return (
    <div className={`kpi-card ${className}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        {icon && <span className="kpi-card-icon">{icon}</span>}
      </div>
      <div className="kpi-card-body">
        <span
          ref={valueRef}
          className="kpi-card-value"
          data-value={value}
          data-duration={duration}
          data-decimals={decimals}
          data-prefix={prefix}
          data-suffix={suffix}
        >
          {prefix}0{suffix}
        </span>
        {trend && (
          <span className={`kpi-card-trend ${trendDirection}`}>
            {trendDirection === "up" ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      {footer && <div className="kpi-card-footer">{footer}</div>}
    </div>
  );
}
