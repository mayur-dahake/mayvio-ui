# Multi-Select Dropdown

The **Multi-Select Dropdown** provides an advanced tag-based selection UI with search filtering, grouped options, Select All/Clear All shortcuts, and keyboard navigation.

---

## 📂 File Requirements
* **CSS:** [multi-select.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/multi-select.css)
* **JS:** [multi-select.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/multi-select.js)

---

## 🧱 HTML Template
```html
<div class="ms-wrapper" aria-expanded="false" aria-haspopup="listbox" aria-label="Tech stack selector">
  <div class="ms-trigger" role="combobox" tabindex="0">
    <div class="ms-tags">
      <span class="ms-placeholder">Choose options...</span>
      <span class="ms-count" hidden>0</span>
    </div>
  </div>
  <div class="ms-dropdown" role="listbox" aria-multiselectable="true">
    <div class="ms-search-bar">
      <input class="ms-search" type="search" placeholder="Search..." />
    </div>
    <div class="ms-toolbar">
      <button class="ms-select-all" type="button">Select All</button>
      <button class="ms-clear-all" type="button" disabled>Clear All</button>
    </div>
    <ul class="ms-list" role="presentation"></ul>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initMultiSelect } from "./components/multi-select.js";

// Binds trigger click, search filtering, tag chips, Select All, Clear All, and keyboard navigation
initMultiSelect();
```

---

## ♿ Accessibility
* `role="combobox"` on the trigger, `role="listbox"` on the dropdown panel
* `aria-multiselectable="true"` on the listbox to communicate multi-select behavior
* `aria-selected="true|false"` on each option item
* `aria-expanded="true|false"` on the wrapper to communicate dropdown state
* **Keyboard:** `ArrowDown/Up` navigates options, `Enter` toggles, `Escape` closes, `Backspace` removes last tag

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|---|---|---|
| `--primary` | `hsl(250 85% 65%)` | Tag chip background tint and active states |
| `--card` | `hsl(240 10% 16%)` | Dropdown panel background |
| `--border` | `hsl(240 10% 22%)` | Input box and dropdown borders |
| `--radius-md` | `10px` | Trigger and dropdown corner radius |

---

## 🔌 Framework Quick Start
* **React:** Maintain a `Set` of selected values in component state; render tag chips from the state and filter the options list on search input.
* **Angular:** Use a `FormControl` with a multi-select custom value accessor; emit `selectionChange` events as the user clicks options.
