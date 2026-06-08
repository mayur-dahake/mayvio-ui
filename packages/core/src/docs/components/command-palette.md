# Command Palette

The **Command Palette** provides an overlay list box triggered via keyboard shortcut (`Ctrl + K` or `Cmd + K`) to search and execute application actions.

---

## 📂 File Requirements
* **CSS:** [command-palette.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/command-palette.css)
* **JS:** [command-palette.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/command-palette.js)

---

## 🧱 HTML Template
```html
<div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
  <div class="command-palette-panel">
    <div class="command-palette-header">
      <h3>Command Palette</h3>
      <button class="command-palette-close" aria-label="Close command palette">×</button>
    </div>
    <input class="command-palette-input" type="search" placeholder="Search commands…" aria-label="Search commands" />
    <div class="command-palette-list" role="listbox">
      <button class="command-palette-item" data-command="Go to Dashboard" role="option">
        <div>
          <h4>Go to Dashboard</h4>
          <p>Navigate to main workspace.</p>
        </div>
        <span>⌘+1</span>
      </button>
    </div>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initCommandPalette } from "./components/command-palette.js";

// Mounts listeners for global shortcut keypresses, filters options, and runs commands
initCommandPalette();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--palette-panel` | `var(--card)` | Panel overlay fill. |
| `--palette-border` | `var(--border)` | Input border lines. |
| `--palette-shadow` | `var(--shadow-lg)` | Drop shadow scale. |

---

## 🔌 Framework Quick Start
* **React:** Listen to window key events in a custom React hook, managing the filter values array inside a listbox layout container.
* **Angular:** Build a custom search component controlled via input state bindings, triggering actions using EventEmitter directives.
