# Date Picker

The **Date Picker** provides a calendar popup attached to a text input, supporting single date selection and date range selection with month navigation and keyboard access.

---

## 📂 File Requirements
* **CSS:** [date-picker.css](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/styles/components/date-picker.css)
* **JS:** [date-picker.js](file:///Volumes/SSD/Projects/UI%20Projects/mayvio-ui/scripts/components/date-picker.js)

---

## 🧱 HTML Template

### Single Date Picker
```html
<div class="dp-wrapper" id="dp-single">
  <div class="dp-input-group">
    <input class="dp-input" type="text" placeholder="YYYY-MM-DD" readonly
      aria-label="Select date" aria-haspopup="dialog" />
    <button class="dp-trigger" type="button" aria-label="Open calendar">📅</button>
  </div>
  <div class="dp-popup" role="dialog" aria-label="Calendar" aria-hidden="true"></div>
</div>
```

### Range Date Picker
```html
<!-- Add data-range="true" to enable range selection mode -->
<div class="dp-wrapper" id="dp-range" data-range="true">
  <div class="dp-input-group">
    <input class="dp-input" type="text" placeholder="Start → End" readonly
      aria-label="Select date range" aria-haspopup="dialog" />
    <button class="dp-trigger" type="button" aria-label="Open range calendar">📅</button>
  </div>
  <div class="dp-popup" role="dialog" aria-label="Calendar" aria-hidden="true"></div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initDatePicker } from "./components/date-picker.js";

// Automatically initializes all .dp-wrapper elements on the page
initDatePicker();
```

---

## ♿ Accessibility
* Calendar popup has `role="dialog"` and `aria-label="Calendar"`
* Calendar grid uses `role="grid"` with `role="gridcell"` on each day button
* Day buttons receive descriptive `aria-label` with full date string (e.g. "Monday, January 15, 2026")
* `aria-hidden="true"` on the closed popup prevents screen readers from reading hidden content
* **Keyboard:** `Escape` closes the calendar; `Tab` navigates header nav buttons and footer actions

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|---|---|---|
| `--primary` | `hsl(250 85% 65%)` | Selected day, range highlights, and today dot color |
| `--card` | `hsl(240 10% 16%)` | Calendar popup background |
| `--border` | `hsl(240 10% 22%)` | Input, popup, and header divider borders |
| `--radius-lg` | `14px` | Calendar popup corner radius |

---

## 🔌 Framework Quick Start
* **React:** Manage `selectedDate` / `range: { start, end }` in component state; re-render the calendar grid on month navigation using computed `Date` math.
* **Angular:** Bind the selected date to a `FormControl`; use `@Output() dateSelected` EventEmitter and pass values to the parent component via two-way binding.
