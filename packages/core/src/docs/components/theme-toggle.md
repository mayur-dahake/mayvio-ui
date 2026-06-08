# Theme Toggle

The **Theme Toggle** component manages the theme state (Light / Dark mode) with native localStorage persistence and switch bindings.

---

## 📂 File Requirements
* **CSS:** [theme.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/theme.css) (color variables), [theme-toggle.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/theme-toggle.css) (layout toggle)
* **JS:** [theme-toggle.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/theme-toggle.js)

---

## 🧱 HTML Template
```html
<button 
  class="theme-toggle" 
  id="theme-toggle-btn" 
  type="button" 
  role="switch" 
  aria-checked="false" 
  aria-label="Switch to dark theme">
</button>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initThemeToggle } from "./components/theme-toggle.js";

// Initializes click listeners and binds them to local storage
initThemeToggle();
```

---

## 🎨 CSS Customization Variables
Define these variables inside your `:root` or dark theme class to customize look and feel:

| CSS Variable | Default Light | Default Dark | Description |
|--------------|---------------|--------------|-------------|
| `--bg` | `#f8f9fa` | `#0f172a` | Main background color. |
| `--card` | `#ffffff` | `#1e293b` | Component card background color. |
| `--text` | `#0f172a` | `#f8f9fa` | Core typography color. |
| `--border` | `#e2e8f0` | `#334155` | Border lines indicator. |

---

## 🔌 Framework Quick Start
* **React:** Toggle state via React `useState` hook, setting class `.dark` to `document.body` inside `useEffect`.
* **Angular:** Manage toggle via standard class bindings inside component template, persistent preference in lifecycle initializers.
