# Tabs

The **Tabs** component handles accessible horizontal panels switching based on ARIA tablist patterns.

---

## 📂 File Requirements
* **CSS:** [tabs.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/tabs.css)
* **JS:** [tabs.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/tabs.js)

---

## 🧱 HTML Template
```html
<div class="tabs">
  <div role="tablist" aria-label="Feature Tabs">
    <button role="tab" id="tab-opt-1" aria-controls="panel-opt-1" aria-selected="true" tabindex="0">Overview</button>
    <button role="tab" id="tab-opt-2" aria-controls="panel-opt-2" aria-selected="false" tabindex="-1">Settings</button>
  </div>

  <div role="tabpanel" id="panel-opt-1" aria-labelledby="tab-opt-1" class="active">
    <h3>Overview Pane</h3>
    <p>Product dashboard summary parameters.</p>
  </div>

  <div role="tabpanel" id="panel-opt-2" aria-labelledby="tab-opt-2" hidden>
    <h3>Settings Pane</h3>
    <p>Adjust system configurations here.</p>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initTabs } from "./components/tabs.js";

// Binds horizontal arrow key navigation inside tab headers list
initTabs();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--tabs-border` | `var(--border)` | Line selector color. |
| `--tabs-active` | `var(--primary)` | Selected text/line highlight indicator. |

---

## 🔌 Framework Quick Start
* **React:** Store selected index in state hook, mapping tabs dynamically to prevent manual DOM listeners.
* **Angular:** Wrap layout panels using standard directive bindings (*ngFor/*ngIf) and local active select properties.
