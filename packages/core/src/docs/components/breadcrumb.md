# Breadcrumb

The **Breadcrumb** component represents visual hierarchy trails to assist users in page-level navigation structure.

---

## 📂 File Requirements
* **CSS:** [breadcrumb.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/breadcrumb.css)
* **JS:** Pure CSS layouts. No JavaScript required.

---

## 🧱 HTML Template
```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="#">Home</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <a href="#">Projects</a>
  <span class="breadcrumb-separator" aria-hidden="true">/</span>
  <!-- The final current page must contain aria-current="page" -->
  <span aria-current="page">Dashboard</span>
</nav>
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--breadcrumb-divider`| `var(--text-muted)`| Color for separators. |
| `--breadcrumb-active` | `var(--text)` | Core highlight color for active node label. |

---

## 🔌 Framework Quick Start
* **React:** Map a breadcrumb object array, rendering a spacer span for all nodes preceding the final one.
* **Angular:** Use ng-templates inside loops to separate items and highlight the final terminal node using `[attr.aria-current]="last ? 'page' : null"`.
