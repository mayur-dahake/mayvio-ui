# Accordion

The **Accordion** component handles vertical panel sections collapse with smooth height expansion.

---

## 📂 File Requirements
* **CSS:** [accordion.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/accordion.css)
* **JS:** [accordion.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/accordion.js)

---

## 🧱 HTML Template
```html
<div class="accordion">
  <!-- Enable multi-open toggle -->
  <div class="accordion-mode-toggle">
    <label>
      <input type="checkbox" id="multiExpandToggle" data-multi-expand-toggle>
      Allow multiple panels open
    </label>
  </div>

  <div class="accordion-item">
    <button class="accordion-trigger" aria-expanded="false" aria-controls="acc-panel-1">
      What is Mayvio UI?
      <span class="accordion-icon" aria-hidden="true">▼</span>
    </button>
    <div class="accordion-content" id="acc-panel-1">
      <div class="accordion-content-inner">
        <div class="accordion-body">
          A collection of accessible, themeable UI components.
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initAccordion } from "./components/accordion.js";

// Binds panel transitions and multi-expand switches
initAccordion();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--accordion-border` | `var(--border)` | Separation border color. |
| `--accordion-bg` | `var(--card)` | Accordion header and panel background color. |

---

## 🔌 Framework Quick Start
* **React:** Track an array or index of active indices inside component state to toggling visibility dynamically.
* **Angular:** Use binding states on panel item indices inside your component template classes.
