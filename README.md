# Mayvio UI

> **Build Faster. Design Better.**

Mayvio UI is a growing collection of modern, responsive, and accessible UI components designed to help developers build beautiful web applications faster. The project focuses on clean design, smooth user experiences, reusable architecture, theme support, and zero-dependency implementation.

Components are built with performance, maintainability, and accessibility in mind, making them suitable for learning, experimentation, and real-world applications.

---

## 🎯 Mission & Vision

### Mission
To create a modern UI ecosystem that helps developers build beautiful, accessible, and scalable applications faster.

### Vision
To evolve Mayvio UI into a complete design system featuring:
* UI Components
* Dashboard Templates
* Form Components
* Data Components
* Design Tokens
* Documentation Portal
* Interactive Playground
* Developer Tools

---

## ✨ Features

* **Light / Dark Theme:** Native theme engine with localStorage persistence.
* **Skeleton Loader:** 4 layouts, 3 animations (shimmer, wave, pulse).
* **Toast Notifications:** 4 variants, auto-dismiss, progress bar, stacking.
* **Modal Dialogs:** Confirmation & information variants, escape/backdrop close.
* **Responsive Layout:** Fully responsive, mobile-first design system.
* **Accessibility Focused:** Keyboard navigation and ARIA support.
* **Modular Architecture:** Self-contained CSS and JS files per component.
* **No Build Step:** Buildless implementation using vanilla web tech.
* **Code Snippets:** Copy-to-clipboard examples for all components.

---

## 🛠️ Core Principles

* **Accessibility First:** Design with WAI-ARIA and keyboard patterns from day one.
* **Mobile Responsive:** Flexibly adapt to Mobile, Tablet, Laptop, and Monitor viewports.
* **Reusable Architecture:** Keep styling and logic decoupled and modular.
* **Zero Dependencies:** Pure vanilla HTML5, CSS3, and JavaScript only.
* **Performance Focused:** Optimize transitions, layouts, and loading speeds.
* **Developer Experience:** Provide clean code examples and easy copy-paste pathways.
* **Modern UI Design:** Harmonious colors, sleek dark modes, and smooth interactions.

---

## 📦 Component Roadmap

### Phase 1 — Foundation (Completed)
* **Theme Switcher:** Light/dark mode toggle with local storage persistence.
* **Skeleton Loader:** 4 layouts, 3 animations (shimmer, wave, pulse).
* **Toast Notification:** 4 variants, auto-dismiss, progress bar, stacking.
* **Modal Dialog:** Confirmation & information variants, escape/backdrop close.
* **Tabs:** Keyboard navigation, ARIA tablist pattern.
* **Accordion:** Single/multi expand, smooth height transitions.

### Phase 2 — Productivity (Completed)
* **Dropdown:** Search, keyboard support, single & multi select.
* **Tooltip:** Top, bottom, left, right positioning.
* **Avatar:** Image, initials, group stack.
* **Badge:** Success, error, warning, info variants.
* **Progress Bar:** Determinate slider, indeterminate animation.
* **Alert:** Dismissible, action buttons, 4 variants.

### Phase 3 — Application (Completed)
* **Command Palette:** Keyboard shortcut (`Ctrl + K`), search filter, quick actions.
* **Sidebar Navigation:** Collapsible layout navigation.
* **Notification Center:** Dismissible updates, clear all actions.
* **Breadcrumb:** Hierarchy trail with current page state.

### Phase 4 — Enterprise & Form Primitives (Completed)
* **Data Grid:** Sorting, filtering, pagination, column visibility.
* **Multi Select:** Advanced standalone multi-select with search.
* **Date Picker:** Single date & date range picker.
* **File Upload:** Drag-and-drop targets with upload progress.
* **Form Primitives:** React and Angular wrappers for Checkbox, Input, RadioGroup, Select, Slider, Switch, and Textarea.

### Phase 5 — Dashboard (Planned)
* KPI Cards (Animated counters), Analytics Widgets, charts, timeline, activity feed.

### Phase 6 — Productivity Apps (Planned)
* Kanban Board, Notes Application, Task Manager.

### Phase 7 — Developer Ecosystem (In Progress)
* Interactive documentation site (Next.js), playground sandbox, theme builder.

---

## 📂 Project Structure (NPM Workspaces Monorepo)

```
mayvio-ui/
├── package.json               # Root workspaces configuration
├── vercel.json                # Vercel routing configuration
├── packages/
│   ├── core/                  # Core vanilla JS/CSS assets (publishes as 'mayvio-ui')
│   │   ├── package.json
│   │   └── src/               # Core script and stylesheet sources
│   ├── react/                 # React wrapper components (publishes as '@mayvio-ui/react')
│   │   ├── package.json
│   │   └── src/               # React TSX wrappers
│   └── angular/               # Angular wrapper components (publishes as '@mayvio-ui/angular')
│       ├── package.json
│       └── src/               # Angular TS modules & components
└── apps/
    ├── playground/            # Showcase app (Vite-powered index.html demo)
    │   ├── package.json
    │   ├── index.html
    │   └── scripts/           # Playground orchestrations & docs explorer
    └── docs/                  # Interactive documentation portal (Next.js)
        ├── package.json
        └── app/               # Next.js App router for component docs
```

---

## 🚀 Local Setup & Development

Ensure you have Node.js (version 18 or 20) installed, and run:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Compile Packages:**
   ```bash
   npm run build
   ```
3. **Start Playground (Local Live Dev Server):**
   ```bash
   npm run dev
   ```
   This will spin up a Vite server for `apps/playground` running at `http://localhost:5173`. Any edits to the core CSS/JS will trigger hot-reloading!

---

## 🔌 NPM Consumption Guide

You can integrate Mayvio UI components into your projects directly from NPM.

### 1. Vanilla HTML/JS

* **Install:**
  ```bash
  npm install mayvio-ui
  ```
* **CSS Import:**
  ```javascript
  import "mayvio-ui/css";
  ```
* **JS Initialization:**
  ```javascript
  import { initDatePicker } from "mayvio-ui";
  initDatePicker(document.querySelector(".dp-wrapper"));
  ```

### 2. React Components

* **Install:**
  ```bash
  npm install mayvio-ui @mayvio-ui/react
  ```
* **CSS Import:**
  ```javascript
  import "mayvio-ui/css";
  ```
* **Usage:**
  ```jsx
  import { DataGrid, DatePicker, Modal } from "@mayvio-ui/react";
  // Use <DatePicker /> or <DataGrid /> directly in your JSX!
  ```

### 3. Angular Components

* **Install:**
  ```bash
  npm install mayvio-ui @mayvio-ui/angular
  ```
* **CSS Import:** Include in global `styles.css`:
  ```css
  @import "mayvio-ui/css";
  ```
* **Usage:** Import `MayvioUIModule` in your module/component imports:
  ```typescript
  import { MayvioUIModule } from "@mayvio-ui/angular";
  ```
  And use custom elements in HTML: `<mayvio-data-grid [initialData]="data"></mayvio-data-grid>`

---

## 🌐 Deployments & Automation

1. **Vercel:**
   The playground is configured for automatic Vercel deployments. The root `package.json` compiles core libraries, while the `apps/playground/dist` output is hosted.
2. **GitHub Actions Publishing:**
   Whenever you tag a commit with a version tag (e.g. `v3.0.1`) and push it to GitHub, the [NPM Publish Action](file:///.github/workflows/publish.yml) automatically runs checks, builds the libraries, and publishes them to NPM.

---

## 📄 License

MIT

