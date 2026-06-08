# Skeleton Loader

The **Skeleton Loader** is used to represent loading status in placeholders before async data displays on page layouts.

---

## 📂 File Requirements
* **CSS:** [skeleton.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/skeleton.css)
* **JS:** [skeleton.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/skeleton.js) (For interactive demo configuration switcher)

---

## 🧱 HTML Template
```html
<div class="skeleton-layout skeleton-social active" data-animation="shimmer">
  <div class="social-card">
    <div class="skeleton avatar"></div>
    <div class="content">
      <div class="skeleton line w40"></div>
      <div class="skeleton line w20"></div>
    </div>
  </div>
  <div class="skeleton line"></div>
  <div class="skeleton line w80"></div>
  <div class="skeleton media"></div>
</div>
```

---

## ⚙️ JavaScript Switcher API
The JS engine is only required if you allow users to dynamically change layouts or toggle anim cycles:
```javascript
import { initSkeleton } from "./components/skeleton.js";

// Renders the skeleton template selector target
initSkeleton();
```

---

## 🎨 CSS Customization Variables
Customize skeleton colors and pulse/wave transitions:

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--skeleton-base` | `#e2e8f0` | Main fill color for placeholders. |
| `--skeleton-shimmer` | `linear-gradient` | Highlight wave gradient pattern. |

---

## 🔌 Framework Quick Start
* **React:** Define placeholder markup directly in your components, toggling `.active` classes based on fetching state.
* **Angular:** Use `*ngIf` to toggle structural skeleton wrapper grids.
