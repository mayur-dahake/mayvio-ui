# Modal Dialog

The **Modal Dialog** component displays interactive overlays (confirmation details or announcements) while locking document background scroll.

---

## 📂 File Requirements
* **CSS:** [modal.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/modal.css)
* **JS:** [modal.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/modal.js)

---

## 🧱 HTML Template
```html
<!-- Button Trigger -->
<button class="btn" data-modal-target="#deleteConfirmModal">Delete Profile</button>

<!-- Modal Overlay -->
<div class="modal-overlay" id="deleteConfirmModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modal-title">Confirm Deletion</h3>
      <button class="modal-close" aria-label="Close modal">✕</button>
    </div>
    <p class="modal-body">
      Are you sure you want to delete your profile? This cannot be undone.
    </p>
    <div class="modal-actions">
      <button class="btn btn-secondary" data-modal-dismiss>Cancel</button>
      <button class="btn btn-danger">Confirm Delete</button>
    </div>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initModal } from "./components/modal.js";

// Binds trigger clicks, backdrop dismiss, and Escape keypress listeners
initModal();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--overlay` | `rgba(0, 0, 0, 0.4)` | Backdrop background color. |
| `--modal-width` | `min(500px, 100%)` | Standard width container scale. |

---

## 🔌 Framework Quick Start
* **React:** See complete integration wrapper inside [examples/react-integration/ModalWrapper.jsx](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/react-integration/ModalWrapper.jsx).
* **Angular:** See directive trigger inside [examples/angular-integration/modal.directive.ts](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/angular-integration/modal.directive.ts).
