# Alert

The **Alert** component renders inline contextual alerts (warnings, success states, or updates) with action triggers and dismiss controls.

---

## 📂 File Requirements
* **CSS:** [alert.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/alert.css)
* **JS:** [alert.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/alert.js) (For click handlers cleanup)

---

## 🧱 HTML Template
```html
<div class="alert success" role="alert">
  <span class="alert-icon" aria-hidden="true">✓</span>
  <div class="alert-content">
    <div class="alert-title">Changes Saved</div>
    <div class="alert-message">Your profile has been updated.</div>
    <div class="alert-actions">
      <button class="alert-action">Upgrade Plan</button>
      <button class="alert-action" data-action="dismiss">Dismiss</button>
    </div>
  </div>
  <button class="alert-close" aria-label="Dismiss alert">✕</button>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initAlerts } from "./components/alert.js";

// Binds close buttons to trigger transition fades on alert nodes
initAlerts();
```

---

## 🎨 CSS Customization Variables
Customize background box tints:

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--alert-success-bg` | `color-mix(...)` | Tints the alert background. |
| `--success` | `#10b981` | Accent highlight color. |

---

## 🔌 Framework Quick Start
* **React:** Control alert visibility state using conditions: `{visible && <Alert onClose={() => setVisible(false)} />}`.
* **Angular:** Manage warning dismisses using event emitters (`close = new EventEmitter()`) and standard element bindings.
