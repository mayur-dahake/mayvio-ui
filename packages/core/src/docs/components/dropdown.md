# Dropdown

The **Dropdown** component provides a searchable select input with single and multi-selection modes and chip builders.

---

## 📂 File Requirements
* **CSS:** [dropdown.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/dropdown.css)
* **JS:** [dropdown.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/dropdown.js)

---

## 🧱 HTML Template (Multi-select)
```html
<div class="dropdown" id="dropdownMulti" data-multi="true">
  <button class="dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="dropdown-label placeholder">Select options…</span>
    <span class="dropdown-chevron" aria-hidden="true">▼</span>
  </button>
  <div class="dropdown-menu" role="listbox" aria-multiselectable="true">
    <div class="dropdown-search">
      <input type="text" placeholder="Search…" aria-label="Search options">
    </div>
    <ul class="dropdown-options">
      <li class="dropdown-option" data-value="html" role="option">HTML</li>
      <li class="dropdown-option" data-value="css" role="option">CSS</li>
      <li class="dropdown-option" data-value="js" role="option">JavaScript</li>
    </ul>
  </div>
  <!-- Chips wrapper (placed outside/below for multiselect) -->
  <div class="dropdown-chips"></div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initDropdowns } from "./components/dropdown.js";

// Activates search filtering, chip generation, and Arrow key loop listeners
initDropdowns();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--dropdown-border` | `var(--border)` | Menu outlines. |
| `--dropdown-bg` | `var(--card)` | Listbox fill. |
| `--dropdown-hover` | `var(--bg-secondary)` | List item highlighted color. |

---

## 🔌 Framework Quick Start
* **React:** See complete integration wrapper inside [examples/react-integration/DropdownWrapper.jsx](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/react-integration/DropdownWrapper.jsx).
* **Angular:** See custom dropdown component inside [examples/angular-integration/dropdown.component.ts](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/examples/angular-integration/dropdown.component.ts).
