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

### Phase 4 — Enterprise (Completed)
* **Data Grid:** Sorting, filtering, pagination, column visibility.
* **Multi Select:** Advanced standalone multi-select with search.
* **Date Picker:** Single date & date range picker.
* **File Upload:** Drag-and-drop targets with upload progress.

### Phase 5 — Dashboard (Planned)
* KPI Cards (Animated counters), Analytics Widgets, charts, timeline, activity feed.

### Phase 6 — Productivity Apps (Planned)
* Kanban Board, Notes Application, Task Manager.

### Phase 7 — Developer Ecosystem (Planned)
* Interactive documentation site, playground playground, theme builder.

---

## 📂 Project Structure

```
mayvio-ui/
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

---

## 🚀 Getting Started

Open `index.html` in your browser, or serve it locally using:

```bash
npx serve .
```

---

## 🔌 How to Integrate

You can integrate Mayvio UI components into your project in three different ways:

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

1. Copy its specific stylesheet: `styles/components/toast.css`. Ensure the base variables from `styles/theme.css` are active.
2. Copy its script file: `scripts/components/toast.js`.
3. In your main script, import and initialize the helper:
   ```javascript
   import { initToast, createToast } from "./components/toast.js";
   initToast();
   ```

### Option C: CDN Integration (Buildless)
You can directly link stylesheets and import modular JS from a CDN (such as unpkg) without downloading any files:

```html
<!-- Link consolidated styles -->
<link rel="stylesheet" href="https://unpkg.com/mayvio-ui/styles/main.css">

<!-- Import and initialize components dynamically inside a module script -->
<script type="module">
  import { initAccordion, createToast } from "https://unpkg.com/mayvio-ui/scripts/index.js";
  
  // Initialize accordion triggers
  initAccordion();
  
  // Build a test success toast
  createToast("success", "Successfully loaded via unpkg CDN!");
</script>
```

---

## 🛠️ Troubleshooting & FAQ

#### 1. Why are skeleton loader transitions/shimmers missing?
Ensure you have copied both `styles/base.css` (or `styles/main.css`) AND the specific component styles. Transitions rely on CSS variable definitions mapping to the global `--skeleton-base` and animation configurations in `base.css`.

#### 2. Toast alerts show up but don't auto-dismiss?
Make sure that your scripts are loaded as type `module` (`<script type="module">`) and that `initToast()` is successfully called on DOM Content Loaded. The auto-dismiss handler runs on page initialization callbacks.

#### 3. Modal overlays close immediately on backdrop clicks?
Ensure that your overlay element has class `.modal-overlay` and the modal content box is wrapped inside `.modal`. The click listener checks if the click target is exactly the overlay background layer.

---

## 🔮 Future Ecosystem

Mayvio UI is designed to scale with future companion products:
* `mayvio-ui` (This project - core component library)
* `mayvio-dashboard` (Admin and analytical dash layouts)
* `mayvio-report-builder` (Custom document and query builders)
* `mayvio-ai-assistant` (Interactive layout generator)
* `mayvio-workflow` (Automation visualizers)
* `mayvio-labs` (Experimental UI components)

---

## 📄 License

MIT
