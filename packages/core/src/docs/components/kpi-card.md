# KPI Card

The **KPI Card** displays key performance indicators and metrics with scroll-triggered animated counters.

---

## 📂 File Requirements
* **CSS:** [kpi-card.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/kpi-card.css)
* **JS:** [kpi-card.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/kpi-card.js)

---

## 🧱 HTML Template
```html
<div class="kpi-card">
  <div class="kpi-card-header">
    <span class="kpi-card-title">Active Users</span>
    <span class="kpi-card-icon">👥</span>
  </div>
  <div class="kpi-card-body">
    <!-- Value element with animation configuration data attributes -->
    <span class="kpi-card-value" 
          data-value="12450" 
          data-duration="2000" 
          data-prefix="" 
          data-suffix="" 
          data-decimals="0">0</span>
    <span class="kpi-card-trend up">↑ 12%</span>
  </div>
  <div class="kpi-card-footer">Compared to last month</div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initKpiCards } from "./components/kpi-card.js";

// Scans elements matching .kpi-card-value[data-value] and plays easing counters when scrolled into view
initKpiCards();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--card` | `#ffffff` | Background color of the KPI card. |
| `--border` | `#e2e8f0` | Border color. |
| `--radius-md` | `10px` | Rounded corners border radius. |
| `--shadow` | `0 1px 3px rgba(0,0,0,0.1)` | Box shadow depth. |
| `--primary` | `#3b82f6` | Icon and theme color highlight. |
| `--success` | `#10b981` | Green color for upward trend lines. |
| `--error` | `#ef4444` | Red color for downward trend lines. |

---

## 🔌 Framework Quick Start

### React
```jsx
import { KpiCard } from "@mayvio-ui/react";

<KpiCard 
  title="Active Users" 
  value={12450} 
  trend="12%" 
  trendDirection="up" 
  footer="Compared to last month"
/>
```

### Angular
```html
<mayvio-kpi-card 
  title="Active Users" 
  [value]="12450" 
  trend="12%" 
  trendDirection="up" 
  footer="Compared to last month">
</mayvio-kpi-card>
```
