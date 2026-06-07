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

## Project Structure

```
ui-component-lab/
├── index.html
├── styles/
│   ├── base.css
│   ├── layout.css
│   ├── theme.css
│   ├── utilities.css
│   └── components/
├── scripts/
│   ├── app.js
│   ├── theme.js
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

## Roadmap

- **v1.0** — Foundation components
- **v1.5** — Productivity components (current)
- **v2.0** — Command palette, sidebar, notification center, breadcrumb
- **v3.0** — Data grid, date picker, multi select, file upload
- **v4.0+** — Dashboard widgets, kanban, documentation site, GitHub Pages

## License

MIT
