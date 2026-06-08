# Badge

The **Badge** component represents status indicator badges (Beta tags, Stable releases, warning counters).

---

## 📂 File Requirements
* **CSS:** [badge.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/badge.css)
* **JS:** Pure CSS styling. No JavaScript required.

---

## 🧱 HTML Template
```html
<!-- Filled dot variant -->
<span class="badge success dot">Stable</span>
<span class="badge error dot">Error</span>

<!-- Outline variant -->
<span class="badge warning outline">Warning</span>
<span class="badge info outline">Info</span>
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--success` | `#10b981` | Success green theme color. |
| `--error` | `#ef4444` | Error red theme color. |
| `--warning` | `#f59e0b` | Warning amber theme color. |
| `--info` | `#3b82f6` | Informational blue theme color. |

---

## 🔌 Framework Quick Start
* **React:** Pass variant name and outlines as props, outputting standard CSS classes list.
* **Angular:** Use binding attributes to toggle class classes on `span` container elements.
