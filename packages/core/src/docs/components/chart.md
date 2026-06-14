# Chart

The **Chart** component renders interactive, responsive, and lightweight SVG-based Line, Bar, and Donut charts with zero third-party dependencies.

---

## 📂 File Requirements
* **CSS:** [chart.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/chart.css)
* **JS:** [chart.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/chart.js)

---

## 🧱 HTML Template
```html
<!-- Parent wrapper target for chart canvas render -->
<div id="demoChart" class="chart-container" style="width: 100%; max-width: 600px;"></div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { MayvioChart } from "./components/chart.js";

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { label: "Sales", data: [35, 50, 40, 75, 60, 90], color: "var(--primary)" },
    { label: "Costs", data: [20, 25, 30, 45, 35, 50], color: "var(--warning)" }
  ]
};

// Instantiates a new SVG Line chart
const chart = new MayvioChart("#demoChart", {
  type: "line", // options: 'line', 'bar', 'donut'
  data: lineData,
  options: {
    gridLines: true,
    tooltips: true,
    donutThickness: 24
  }
});
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--card` | `#ffffff` | Background panel color. |
| `--border` | `#e2e8f0` | Grid and separating line border. |
| `--text` | `#0f172a` | Text labels and titles font color. |
| `--text-muted` | `#64748b` | Muted subtitle and ticks labels. |
| `--donut-hover-width` | `32` | Width stroke size on hovering donut segments. |

---

## 🔌 Framework Quick Start

### React
```jsx
import { Chart } from "@mayvio-ui/react";

const data = {
  labels: ["Q1", "Q2", "Q3"],
  datasets: [{ label: "Sales", data: [100, 150, 120] }]
};

<Chart type="bar" data={data} title="Sales History" />
```

### Angular
```html
<mayvio-chart 
  type="donut" 
  [data]="chartData" 
  title="Device Share">
</mayvio-chart>
```
