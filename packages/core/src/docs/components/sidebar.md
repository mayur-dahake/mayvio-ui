# Sidebar Navigation

The **Sidebar Navigation** is a collapsible left-side layout menu featuring icons, text labels, and active route markers.

---

## 📂 File Requirements
* **CSS:** [sidebar.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/sidebar.css)
* **JS:** [sidebar.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/sidebar.js)

---

## 🧱 HTML Template
```html
<div class="sidebar">
  <nav class="sidebar-nav" aria-label="Sidebar navigation">
    <a href="#" class="sidebar-link active" title="Dashboard">
      <span class="sidebar-icon">📊</span>
      <span class="sidebar-label">Dashboard</span>
    </a>
    <a href="#" class="sidebar-link" title="Projects">
      <span class="sidebar-icon">📁</span>
      <span class="sidebar-label">Projects</span>
    </a>
  </nav>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initSidebar } from "./components/sidebar.js";

// Binds trigger buttons to collapse sidebar panels and toggle screen states
initSidebar();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--sidebar-width` | `240px` | Extended default width. |
| `--sidebar-collapsed` | `72px` | Collapsed width. |

---

## 🔌 Framework Quick Start
* **React:** Toggle a `isCollapsed` boolean state hook, and render conditional sidebar items classes list.
* **Angular:** Use `[class.collapsed]="isCollapsed"` class list bindings in template code.
