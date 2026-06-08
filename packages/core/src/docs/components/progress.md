# Progress Bar

The **Progress Bar** component handles animated indicators for both determinate and indeterminate loading operations.

---

## 📂 File Requirements
* **CSS:** [progress.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/progress.css)
* **JS:** [progress.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/progress.js) (For interactive value changes)

---

## 🧱 HTML Template (Determinate)
```html
<div class="progress-demo">
  <div class="progress-header">
    <span class="progress-label">Upload</span>
    <span class="progress-value">60%</span>
  </div>
  <div class="progress-track">
    <!-- Width determines progress percent fill -->
    <div class="progress-fill" style="width: 60%"></div>
  </div>
  <!-- Slider control input (optional) -->
  <input type="range" class="progress-slider" min="0" max="100" value="60" aria-label="Progress slider">
</div>
```

---

## ⚙️ JavaScript Initialization
The helper script is used to sync progress fills with range inputs:
```javascript
import { initProgress } from "./components/progress.js";

// Syncs value sliders and triggers loader updates
initProgress();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--progress-track` | `var(--border)` | Unfilled background rail color. |
| `--progress-fill` | `var(--primary)`| Loading fill color. |

---

## 🔌 Framework Quick Start
* **React:** Bind the width styling to component state properties directly: `<div style={{ width: \`\${value}%\` }} />`.
* **Angular:** Set progress percentage using property bindings: `[style.width.%]="value"`.
