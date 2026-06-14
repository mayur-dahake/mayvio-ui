# Mayvio UI — Product Roadmap & Architecture

## Vision
Build a modern frontend component library and playground showcasing reusable, accessible, themeable, and production-ready UI components using HTML, CSS, and JavaScript.

## Current Status

- Current release status: `v3.2.0` (Monorepo and Phase 5 complete)
- Completed phases: Phase 1, Phase 2, Phase 3, Phase 4, Phase 4.5, and Phase 5
- Next focus: Phase 6 — Productivity Applications

### Goals
- Portfolio project
- GitHub showcase
- LinkedIn content source
- Frontend architecture practice
- Design system foundation

---

## Tech Stack

### Initial Version
- HTML5
- CSS3
- JavaScript (Vanilla)

### Future
- Angular Version
- React Version
- Web Components
- Storybook Integration

---

## Design Principles

### Accessibility
- Keyboard navigation
- Focus states
- ARIA labels
- Screen reader support

### Performance
- No dependencies
- Lazy initialization
- Hardware accelerated animations

### Design System
- CSS Variables
- Reusable utility classes
- Theme engine

### Responsive
- Mobile first
- Tablet support
- Desktop support

---

## Project Structure (NPM Workspaces Monorepo)

```
mayvio-ui/
├── package.json               # Root workspace configuration
├── packages/
│   ├── core/                  # Core vanilla CSS & JS (publishes as 'mayvio-ui')
│   │   ├── package.json
│   │   ├── README.md
│   │   └── src/
│   │       ├── scripts/       # Component controller scripts
│   │       └── styles/        # Component CSS stylesheets
│   ├── react/                 # React wrapper components (publishes as '@mayvio-ui/react')
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── src/               # React TSX components
│   └── angular/               # Angular wrapper components (publishes as '@mayvio-ui/angular')
│       ├── package.json
│       ├── ng-package.json
│       ├── tsconfig.lib.json
│       └── src/               # Angular Components & Directives
└── apps/
    └── playground/            # Portfolio showcase playground (imports packages locally)
        ├── index.html
        ├── package.json
        ├── scripts/           # Demo orchestration logic
        └── styles/            # Playground layout styling
```

---

## Application Layout
- Navbar
- Hero Section
- Statistics
- Component Showcase
- Documentation
- Roadmap
- Footer

---

## Theme Engine

### Supported Themes
- Light
- Dark

#### Future
- Dracula
- Nord
- Material
- High Contrast

### Theme Storage
- `localStorage`
- `theme = light | dark`

### Theme Flow
User Click

↓

Theme Toggle

↓

Update CSS Variables

↓

Persist To Local Storage

↓

Apply On Reload

---

## Phase 1
Goal: Build foundation and core UI interactions.

### Components

#### Theme Switcher
Features:
- Light Mode
- Dark Mode
- Persistent Theme

#### Skeleton Loader
Layouts:
- Social Feed
- Dashboard
- Profile
- Table

Animations:
- Shimmer
- Wave
- Pulse

#### Toast Notification
Variants:
- Success
- Error
- Warning
- Info

Features:
- Auto Close
- Progress Bar
- Stack Support

#### Modal Dialog
Features:
- Overlay
- Escape Close
- Backdrop Click Close

Variants:
- Confirmation
- Information

#### Accordion
Features:
- Single Expand
- Multi Expand

Animations:
- Height Transition

#### Tabs
Features:
- Tab Navigation
- Active State

Deliverable: Version 1.0

---

## Phase 2
Goal: Productivity Components

### Components

#### Dropdown
Features:
- Search
- Keyboard Support
- Single Select
- Multi Select

#### Tooltip
Features:
- Top
- Bottom
- Left
- Right

#### Badge
Variants:
- Success
- Error
- Warning
- Info

#### Avatar
Variants:
- Image
- Initials
- Group Avatar

#### Progress Bar
Features:
- Determinate
- Indeterminate

#### Alert Component
Features:
- Dismissible
- Action Buttons

Deliverable: Version 1.5

---

## Phase 3
Goal: Application-Level Components

### Components

#### Command Palette
Shortcut: Ctrl + K

Features:
- Search
- Navigation
- Commands

Inspired By:
- VS Code
- Linear

#### Sidebar Navigation
Features:
- Expand Collapse
- Nested Menu

#### Notification Center
Features:
- Grouping
- Read Unread

#### Breadcrumb
Features:
- Navigation Trail

Deliverable: Version 2.0
Status: Completed

---

## Phase 4
Goal: Enterprise Components

### Components

#### Data Grid
Features:
- Sorting
- Filtering
- Pagination
- Column Visibility

Future:
- Virtual Scroll

#### Date Picker
Features:
- Single Date
- Range

#### Multi Select
Features:
- Search
- Grouping

Note:
- The current dropdown already supports multi-select in its present form
- Phase 4 should focus on an advanced standalone multi-select experience

#### File Upload
Features:
- Drag Drop
- Progress

Deliverable: Version 3.0
Status: Completed ✓

---

## Phase 4.5 — Monorepo & NPM Packaging
Goal: Restructure the codebase into a workspaces monorepo and set up npm package builds for React and Angular wrappers.

### Deliverables
- **Root Workspaces:** Establish workspaces configuration in root `package.json`.
- **`packages/core`:** Publishable core vanilla JS/CSS assets (`mayvio-ui`).
- **`packages/react`:** Publishable React wrapper package (`@mayvio-ui/react`) bundled with `tsup` (ESM/CJS and typings).
- **`packages/angular`:** Publishable Angular library package (`@mayvio-ui/angular`) built with `ng-packagr` (APF standard).
- **`apps/playground`:** The portfolio playground site running against local workspace package symlinks, acting as a live demo of the compiled npm packages.

Status: Completed ✓

---

## Phase 5
Goal: Advanced Dashboard Components

### Components

#### KPI Cards
- Animated Counters

#### Analytics Charts
Mock Data:
- Bar
- Line
- Pie

#### Dashboard Widgets
Features:
- Rearrange
- Collapse

#### Activity Timeline
Features:
- Status Events

Deliverable: Version 4.0
Status: Completed ✓

---

## Phase 6
Goal: Productivity Applications

### Components

#### Kanban Board
Features:
- Drag Drop
- Swimlanes

#### Notes App
Features:
- CRUD

#### Task Manager
Features:
- Status
- Priority

Deliverable: Version 5.0

---

## Phase 7
Goal: Design System

### Features
- Documentation Site
  - Component Docs
  - Usage
  - Accessibility Notes
  - Examples
- Code Snippets
  - Copy HTML
  - Copy CSS
  - Copy JS
- Playground
  - Live Editing
  - Theme Switching

Deliverable: Version 6.0

### Priority Adjustment
- Documentation and integration guides should move earlier in execution priority
- End-user adoption will improve faster if integration docs are strengthened before adding many more components

---

## Phase 8
Goal: Professional Portfolio Release

### Deliverables
- GitHub Pages Deployment
- SEO
- Screenshots
- GIF Demos
- Documentation
- Changelog
- Releases
  - v1.0
  - v2.0
  - v3.0

---

## Final Landing Page Structure
- Navbar
- Hero
- Component Statistics
- Featured Components
- Component Library
- Documentation
- Roadmap
- GitHub CTA
- Footer

---

## Success Criteria
- 20+ Components
- Dark/Light Theme
- Responsive
- Accessible
- Zero Dependencies
- Production Ready
- GitHub Portfolio Quality
