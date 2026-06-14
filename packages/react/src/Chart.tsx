// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { MayvioChart } from "mayvio-ui/scripts/components/chart.js";

/**
 * Chart
 * React wrapper for Mayvio UI SVG-based Line, Bar, and Donut charts.
 *
 * Props:
 * - type: 'line' | 'bar' | 'donut'
 * - data: { labels: string[], datasets: Dataset[] }
 * - options: ChartConfigOptions
 * - title: string header title
 * - className: custom class names
 */
export function Chart({ type = "line", data, options = {}, title, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      new MayvioChart(canvasRef.current, {
        type,
        data,
        options
      });
    }
  }, [type, data, options]);

  return (
    <div className={`chart-container ${className}`}>
      {title && (
        <div className="chart-header">
          <div className="chart-title">{title}</div>
        </div>
      )}
      <div ref={canvasRef} />
    </div>
  );
}
