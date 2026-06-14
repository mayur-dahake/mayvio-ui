/**
 * MayvioChart
 * SVG-based interactive chart library with zero external dependencies.
 * Supports Line, Bar, and Donut/Pie charts.
 */
export class MayvioChart {
  constructor(elementOrSelector, config) {
    this.container = typeof elementOrSelector === "string"
      ? document.querySelector(elementOrSelector)
      : elementOrSelector;

    if (!this.container) return;

    this.config = {
      type: config.type || "line",
      data: config.data || { labels: [], datasets: [] },
      options: {
        gridLines: config.options?.gridLines !== false,
        tooltips: config.options?.tooltips !== false,
        colors: config.options?.colors || [
          "#3b82f6", // primary
          "#22c55e", // success
          "#f59e0b", // warning
          "#ef4444", // error
          "#8b5cf6", // purple
          "#ec4899"  // pink
        ],
        ...config.options
      }
    };

    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="chart-canvas-wrapper">
        <svg viewBox="0 0 500 260" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="chart-tooltip"></div>
      </div>
      <div class="chart-legend"></div>
    `;

    this.svg = this.container.querySelector("svg");
    this.tooltip = this.container.querySelector(".chart-tooltip");
    this.legendContainer = this.container.querySelector(".chart-legend");

    this.render();
    if (this.config.options.tooltips) {
      this.setupTooltips();
    }
  }

  render() {
    const { type, data } = this.config;
    this.svg.innerHTML = ""; // Clear canvas

    if (type === "donut") {
      this.renderDonut();
    } else if (type === "bar") {
      this.renderBar();
    } else {
      this.renderLine();
    }

    this.renderLegend();
  }

  renderLine() {
    const { labels, datasets } = this.config.data;
    if (!labels.length || !datasets.length) return;

    const left = 45;
    const right = 20;
    const top = 20;
    const bottom = 30;
    const width = 500;
    const height = 260;
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;

    // Find max value across all datasets
    let maxVal = Math.max(...datasets.flatMap(d => d.data));
    maxVal = maxVal === 0 ? 100 : Math.ceil(maxVal * 1.15);

    // Render Gridlines
    if (this.config.options.gridLines) {
      const gridCount = 4;
      for (let i = 0; i <= gridCount; i++) {
        const y = top + (i / gridCount) * chartHeight;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", left);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - right);
        line.setAttribute("y2", y);
        line.setAttribute("class", "chart-grid-line");
        this.svg.appendChild(line);

        // Y Labels
        const val = maxVal - (i / gridCount) * maxVal;
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", left - 8);
        label.setAttribute("y", y + 4);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("class", "chart-label");
        label.textContent = Math.round(val).toString();
        this.svg.appendChild(label);
      }
    }

    // Render X Labels
    labels.forEach((lbl, idx) => {
      const x = left + (idx / (labels.length - 1)) * chartWidth;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x);
      text.setAttribute("y", height - bottom + 18);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "chart-label");
      text.textContent = lbl;
      this.svg.appendChild(text);
    });

    // Plot Datasets
    datasets.forEach((dataset, setIdx) => {
      const color = dataset.color || this.config.options.colors[setIdx % this.config.options.colors.length];
      const points = dataset.data.map((val, idx) => {
        const x = left + (idx / (labels.length - 1)) * chartWidth;
        const y = height - bottom - (val / maxVal) * chartHeight;
        return { x, y, value: val, label: labels[idx] };
      });

      // Bezier curve calculations
      let d = `M ${points[0].x} ${points[0].y}`;
      let areaD = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p = points[i];
        const cp1x = p0.x + (p.x - p0.x) / 2;
        const cp1y = p0.y;
        const cp2x = p0.x + (p.x - p0.x) / 2;
        const cp2y = p.y;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
        areaD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
      }

      areaD += ` L ${points[points.length - 1].x} ${height - bottom} L ${points[0].x} ${height - bottom} Z`;

      // Define Linear Gradient for fill area
      const gradId = `line-grad-${setIdx}-${Math.round(Math.random() * 1000)}`;
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.innerHTML = `
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.0"/>
        </linearGradient>
      `;
      this.svg.appendChild(defs);

      // Area path
      const areaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      areaPath.setAttribute("d", areaD);
      areaPath.setAttribute("fill", `url(#${gradId})`);
      areaPath.setAttribute("class", "chart-area");
      this.svg.appendChild(areaPath);

      // Line path
      const linePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      linePath.setAttribute("d", d);
      linePath.setAttribute("class", "chart-line");
      linePath.setAttribute("stroke", color);
      linePath.setAttribute("fill", "none");
      this.svg.appendChild(linePath);

      // Animation slide line effect
      const length = linePath.getTotalLength();
      linePath.style.strokeDasharray = length;
      linePath.style.strokeDashoffset = length;
      // Trigger reflow
      linePath.getBoundingClientRect();
      linePath.style.transition = "stroke-dashoffset 1s ease-out";
      linePath.style.strokeDashoffset = "0";

      // Draw point dots
      points.forEach(p => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", p.x);
        circle.setAttribute("cy", p.y);
        circle.setAttribute("r", "5");
        circle.setAttribute("stroke", color);
        circle.setAttribute("class", "chart-point");
        circle.setAttribute("data-label", p.label);
        circle.setAttribute("data-value", `${dataset.label ? dataset.label + ': ' : ''}${p.value}`);
        this.svg.appendChild(circle);
      });
    });
  }

  renderBar() {
    const { labels, datasets } = this.config.data;
    if (!labels.length || !datasets.length) return;

    const left = 45;
    const right = 20;
    const top = 20;
    const bottom = 30;
    const width = 500;
    const height = 260;
    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;

    let maxVal = Math.max(...datasets.flatMap(d => d.data));
    maxVal = maxVal === 0 ? 100 : Math.ceil(maxVal * 1.15);

    // Gridlines
    if (this.config.options.gridLines) {
      const gridCount = 4;
      for (let i = 0; i <= gridCount; i++) {
        const y = top + (i / gridCount) * chartHeight;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", left);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width - right);
        line.setAttribute("y2", y);
        line.setAttribute("class", "chart-grid-line");
        this.svg.appendChild(line);

        // Y Labels
        const val = maxVal - (i / gridCount) * maxVal;
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", left - 8);
        label.setAttribute("y", y + 4);
        label.setAttribute("text-anchor", "end");
        label.setAttribute("class", "chart-label");
        label.textContent = Math.round(val).toString();
        this.svg.appendChild(label);
      }
    }

    const setLength = datasets.length;
    const groupWidth = chartWidth / labels.length;
    const barGap = 3;
    const innerGap = 2;
    const barWidth = (groupWidth - barGap * 2 - innerGap * (setLength - 1)) / setLength;

    // Draw Bars
    labels.forEach((lbl, groupIdx) => {
      // X Label
      const groupX = left + groupIdx * groupWidth + groupWidth / 2;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", groupX);
      text.setAttribute("y", height - bottom + 18);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "chart-label");
      text.textContent = lbl;
      this.svg.appendChild(text);

      datasets.forEach((dataset, setIdx) => {
        const val = dataset.data[groupIdx] || 0;
        const color = dataset.color || this.config.options.colors[setIdx % this.config.options.colors.length];
        const h = (val / maxVal) * chartHeight;
        const x = left + groupIdx * groupWidth + barGap + setIdx * (barWidth + innerGap);
        const y = height - bottom - h;

        // Custom path to draw rounded top corners only
        const rx = Math.min(4, barWidth / 2);
        let pathD = "";
        if (h > rx) {
          pathD = `
            M ${x},${height - bottom}
            L ${x},${y + rx}
            A ${rx},${rx} 0 0 1 ${x + rx},${y}
            L ${x + barWidth - rx},${y}
            A ${rx},${rx} 0 0 1 ${x + barWidth},${y + rx}
            L ${x + barWidth},${height - bottom}
            Z
          `;
        } else {
          pathD = `
            M ${x},${height - bottom}
            L ${x},${y}
            L ${x + barWidth},${y}
            L ${x + barWidth},${height - bottom}
            Z
          `;
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathD);
        path.setAttribute("fill", color);
        path.setAttribute("class", "chart-bar");
        path.setAttribute("data-label", lbl);
        path.setAttribute("data-value", `${dataset.label ? dataset.label + ': ' : ''}${val}`);

        // Height entrance animation
        path.style.transformOrigin = `${x + barWidth / 2}px ${height - bottom}px`;
        path.style.transform = "scaleY(0)";
        this.svg.appendChild(path);

        setTimeout(() => {
          path.style.transition = "transform 0.5s ease-out";
          path.style.transform = "scaleY(1)";
        }, 50 * groupIdx);
      });
    });
  }

  renderDonut() {
    const { labels, datasets } = this.config.data;
    if (!labels.length || !datasets.length) return;

    // Sum totals of first dataset
    const dataset = datasets[0];
    const total = dataset.data.reduce((sum, v) => sum + v, 0);
    const cx = 250;
    const cy = 130;
    const r = 75;
    const circ = 2 * Math.PI * r;
    const thickness = this.config.options.donutThickness || 24;

    let accumOffset = 0;

    dataset.data.forEach((val, idx) => {
      const color = dataset.colors?.[idx] || this.config.options.colors[idx % this.config.options.colors.length];
      const pct = val / (total || 1);
      const segmentLen = pct * circ;

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", r.toString());
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", thickness.toString());
      circle.setAttribute("class", "chart-donut-segment");
      circle.setAttribute("data-label", labels[idx]);
      circle.setAttribute("data-value", `${val} (${Math.round(pct * 100)}%)`);

      // Segment slicing via dashoffset
      circle.setAttribute("stroke-dasharray", `${segmentLen} ${circ}`);
      circle.setAttribute("stroke-dashoffset", (-accumOffset).toString());

      // Center labels triggers
      circle.style.transformOrigin = `${cx}px ${cy}px`;
      circle.style.transform = "rotate(-90deg)"; // Start from 12 o'clock

      // Entrance loading sweep animation
      circle.style.strokeDasharray = `0 ${circ}`;
      this.svg.appendChild(circle);

      setTimeout(() => {
        circle.style.transition = "stroke-dasharray 0.8s ease-in-out";
        circle.style.strokeDasharray = `${segmentLen} ${circ}`;
      }, 50);

      accumOffset += segmentLen;
    });

    // Render center label
    const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    textGroup.setAttribute("class", "chart-center-text");

    const valText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valText.setAttribute("x", cx.toString());
    valText.setAttribute("y", (cy - 4).toString());
    valText.setAttribute("class", "chart-center-val");
    valText.textContent = total.toLocaleString();

    const lblText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lblText.setAttribute("x", cx.toString());
    lblText.setAttribute("y", (cy + 18).toString());
    lblText.setAttribute("class", "chart-center-lbl");
    lblText.textContent = dataset.label || "Total";

    textGroup.appendChild(valText);
    textGroup.appendChild(lblText);
    this.svg.appendChild(textGroup);
  }

  renderLegend() {
    this.legendContainer.innerHTML = "";
    const { type, data } = this.config;

    if (type === "donut") {
      const dataset = data.datasets[0];
      data.labels.forEach((lbl, idx) => {
        const color = dataset.colors?.[idx] || this.config.options.colors[idx % this.config.options.colors.length];
        this.addLegendItem(lbl, color);
      });
    } else {
      data.datasets.forEach((dataset, idx) => {
        const color = dataset.color || this.config.options.colors[idx % this.config.options.colors.length];
        this.addLegendItem(dataset.label, color);
      });
    }
  }

  addLegendItem(label, color) {
    const item = document.createElement("span");
    item.className = "chart-legend-item";
    item.innerHTML = `
      <span class="chart-legend-color" style="background: ${color}"></span>
      ${label}
    `;
    this.legendContainer.appendChild(item);
  }

  setupTooltips() {
    const elements = this.svg.querySelectorAll(".chart-point, .chart-bar, .chart-donut-segment");

    elements.forEach(el => {
      el.addEventListener("mouseenter", (e) => {
        const label = el.getAttribute("data-label");
        const val = el.getAttribute("data-value");
        if (!label || !val) return;

        this.tooltip.innerHTML = `<strong>${label}</strong><br/>${val}`;
        this.tooltip.classList.add("visible");
        this.updateTooltipPosition(e);
      });

      el.addEventListener("mousemove", (e) => {
        this.updateTooltipPosition(e);
      });

      el.addEventListener("mouseleave", () => {
        this.tooltip.classList.remove("visible");
      });
    });
  }

  updateTooltipPosition(e) {
    const rect = this.container.querySelector(".chart-canvas-wrapper").getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
  }
}
