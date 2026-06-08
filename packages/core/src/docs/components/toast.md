# Toast Notification

The **Toast Notification** displays feedback messages on success, error, warn, and info events.

---

## 📂 File Requirements
* **CSS:** [toast.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/toast.css)
* **JS:** [toast.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/toast.js)

---

## 🧱 HTML Template
Include this empty target container at the root of your HTML `<body>` to collect toasts:
```html
<div id="toastContainer" aria-live="polite" aria-atomic="true"></div>
```

---

## ⚙️ JavaScript Creator Methods
To trigger a new toast dynamically, import the creation function:
```javascript
import { createToast } from "./components/toast.js";

// Parameters: createToast(type, message, duration = 4000)
createToast("success", "Project changes saved!", 3000);
createToast("error", "Failed to sync changes.", 5000);
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--toast-bg` | `var(--card)` | Base card fill. |
| `--toast-border` | `var(--border)` | Card outline. |
| `--toast-success` | `#10b981` | Indicator highlight for success event. |
| `--toast-error` | `#ef4444` | Indicator highlight for error event. |

---

## 🔌 Framework Quick Start
* **React:** Define custom toast components controlled by a global notification context state list.
* **Angular:** Build a toast service that dynamically appends toast overlay components using standard structural overlay providers.
