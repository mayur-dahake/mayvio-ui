# Tooltip

The **Tooltip** component triggers contextual hints on mouse hover and keyboard focus events.

---

## 📂 File Requirements
* **CSS:** [tooltip.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/tooltip.css)
* **JS:** Pure CSS transition. No Javascript initialized listeners required.

---

## 🧱 HTML Template
Wrap the target trigger button and the tooltip bubble inside `.tooltip-wrapper` and define the position via data attributes:
```html
<!-- Position options: top, bottom, left, right -->
<div class="tooltip-wrapper" data-position="top">
  <button class="tooltip-trigger" aria-describedby="tip-item-1">Hover / Focus Me</button>
  <span class="tooltip" id="tip-item-1" role="tooltip">Dynamic hint text goes here</span>
</div>
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--tooltip-bg` | `#0f172a` | Background bubble color (Dracula black). |
| `--tooltip-text` | `#ffffff` | Bubble text label color. |

---

## 🔌 Framework Quick Start
* **React:** Wrap children in a container rendering the tooltip node dynamically on hover state changes.
* **Angular:** Build a custom directive targeting `@HostListener('mouseenter')` and `@HostListener('mouseleave')` to dynamically generate tooltips.
