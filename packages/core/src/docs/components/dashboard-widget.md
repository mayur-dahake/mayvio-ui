# Dashboard Widget

The **Dashboard Widget** handles collapsible and dismissible grid panel cards orchestrating HTML5 Drag & Drop reordering with automatic localStorage persistence.

---

## 📂 File Requirements
* **CSS:** [dashboard-widget.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/dashboard-widget.css)
* **JS:** [dashboard-widget.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/dashboard-widget.js)

---

## 🧱 HTML Template
```html
<div class="widget-grid" id="myDashboardGrid">
  <!-- Widget Item (Requires a unique id to persist layout) -->
  <div class="widget" id="w-perf-card">
    <div class="widget-header">
      <div class="widget-header-left">
        <!-- Grab handle triggers drag sequence -->
        <span class="widget-drag-handle">☰</span>
        <h3 class="widget-title">Performance Monitor</h3>
      </div>
      <div class="widget-actions">
        <button class="widget-btn widget-btn-collapse" aria-expanded="true">▼</button>
        <button class="widget-btn widget-btn-close">✕</button>
      </div>
    </div>
    <div class="widget-content">
      <div class="widget-content-inner">
        <p>Widget contents go here...</p>
      </div>
    </div>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initDashboardWidgets } from "./components/dashboard-widget.js";

// Activates drag handle listeners and loads order from localStorage key
initDashboardWidgets("#myDashboardGrid", {
  storageKey: "my-custom-dashboard-layout"
});
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--card` | `#ffffff` | Widget body background fill. |
| `--border` | `#e2e8f0` | Widget and divider borders. |
| `--bg-secondary` | `#f8f9fa` | Widget header title bar background. |
| `--primary` | `#3b82f6` | Hover drag outline highlights. |

---

## 🔌 Framework Quick Start

### React
```jsx
import { DashboardWidgetGrid, DashboardWidget } from "@mayvio-ui/react";

<DashboardWidgetGrid storageKey="user-dashboard">
  <DashboardWidget id="card1" title="Analytics summary">
    <p>React Card Content</p>
  </DashboardWidget>
</DashboardWidgetGrid>
```

### Angular
```html
<mayvio-dashboard-widget-grid storageKey="user-dashboard">
  <mayvio-dashboard-widget id="card1" title="Analytics summary">
    <p>Angular Card Content</p>
  </mayvio-dashboard-widget>
</mayvio-dashboard-widget-grid>
```
