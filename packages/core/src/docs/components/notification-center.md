# Notification Center

The **Notification Center** displays recent alerts and system status messages inside a collapsible container drawer.

---

## 📂 File Requirements
* **CSS:** [notification-center.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/notification-center.css)
* **JS:** [notification-center.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/notification-center.js)

---

## 🧱 HTML Template
```html
<button class="control-btn" data-toggle-notifications aria-expanded="false">
  Show Notifications
</button>

<div class="notification-panel">
  <div class="notification-item notification-item-success">
    <div class="notification-badge" aria-hidden="true"></div>
    <div class="notification-info">
      <h4>Backup completed</h4>
      <p>Workspace backup was complete.</p>
    </div>
    <button class="notification-dismiss" aria-label="Dismiss notification">✕</button>
  </div>
  <div class="notification-footer">
    <button data-clear-notifications>Clear all</button>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initNotificationCenter } from "./components/notification-center.js";

// Binds overlay visibility controls and triggers individual row deletes
initNotificationCenter();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--panel-width` | `360px` | Notification container drawer width. |
| `--notify-success` | `#10b981` | Accent indicators colors. |

---

## 🔌 Framework Quick Start
* **React:** Store list elements inside state arrays, mapping to lists of notification widgets.
* **Angular:** Use `*ngFor` directives to output notifications list.
