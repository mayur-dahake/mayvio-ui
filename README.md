# UI Component Lab

A modern frontend component library and playground showcasing reusable, accessible, themeable, and production-ready UI components built with **HTML**, **CSS**, and **vanilla JavaScript** — zero dependencies.

## Features

- Light / Dark theme with localStorage persistence
- Fully responsive, mobile-first layout
- Keyboard navigation and ARIA support
- Modular CSS and JS architecture
- Copy-to-clipboard code snippets
- No build step required

## Components

### v1.0 — Foundation

| Component | Features |
|-----------|----------|
| Theme Switcher | Light / dark mode, persistent preference |
| Skeleton Loader | 4 layouts, 3 animations (shimmer, wave, pulse) |
| Toast Notification | 4 variants, auto-dismiss, progress bar, stacking |
| Modal Dialog | Confirmation & information variants, escape / backdrop close |
| Tabs | Keyboard navigation, ARIA tablist pattern |
| Accordion | Single / multi expand, height transition |

### v1.5 — Productivity

| Component | Features |
|-----------|----------|
| Dropdown | Search, keyboard support, single & multi select |
| Tooltip | Top, bottom, left, right positioning |
| Badge | Success, error, warning, info variants |
| Avatar | Image, initials, group stack |
| Progress Bar | Determinate slider, indeterminate animation |
| Alert | Dismissible, action buttons, 4 variants |

### v2.0 — Application

| Component | Features |
|-----------|----------|
| Command Palette | Keyboard shortcut, search, quick actions |
| Sidebar Navigation | Collapsible layout navigation |
| Notification Center | Dismissible updates, clear all actions |
| Breadcrumb | Hierarchy trail with current page state |

## Project Structure

```
ui-component-lab/
├── index.html
├── styles/
│   ├── base.css
│   ├── layout.css
│   ├── theme.css
│   ├── utilities.css
│   ├── main.css
│   └── components/
├── scripts/
│   ├── app.js
│   ├── copy.js
│   └── components/
├── assets/
└── README.md
```

## Getting Started

Open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## How to Integrate

You can integrate these components into your project using one of two methods:

### Option A: Complete Bundle (Easiest)
Link the consolidated stylesheet in your HTML `<head>` and import the initialization scripts:

1. Copy the `styles/` folder into your project.
2. Link the stylesheet in your HTML:
   ```html
   <link rel="stylesheet" href="styles/main.css">
   ```
3. Copy the `scripts/` folder and include `scripts/app.js` as an ES Module:
   ```html
   <script type="module" src="scripts/app.js"></script>
   ```

### Option B: Individual Components (Modular)
If you only need a specific component (e.g., Toast):

1. Copy its specific stylesheet: `styles/components/toast.css` and make sure you have the theme variable definitions from `styles/theme.css` active.
2. Copy its script file: `scripts/components/toast.js`.
3. In your main script, import and initialize the helper:
   ```javascript
   import { initToast, createToast } from "./components/toast.js";
   initToast();
   ```

## Roadmap

- **v1.0** — Foundation components
- **v1.5** — Productivity components
- **v2.0** — Application components (current)
- **v3.0** — Data grid, date picker, advanced multi select, file upload
- **v4.0+** — Dashboard widgets, kanban, documentation site, GitHub Pages

For the full product roadmap and architecture plan, see `ROADMAP.md`.

For the active improvement and adoption tracking list, see `IMPROVEMENTS.md`.

## License

MIT
