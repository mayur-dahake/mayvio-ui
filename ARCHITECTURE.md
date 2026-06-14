# Mayvio UI — Architecture

> This document describes the technical architecture of the Mayvio UI monorepo.
> Read this before making any structural changes to the codebase.

---

## 1. Monorepo Structure

```
mayvio-ui/
├── packages/
│   ├── core/              → mayvio-ui          (Vanilla CSS + JS)
│   ├── react/             → @mayvio-ui/react   (React components)
│   └── angular/           → @mayvio-ui/angular (Angular components)
├── apps/
│   └── docs/              → Next.js documentation site
├── .github/
│   └── workflows/         → CI/CD pipelines
├── .changeset/            → Changesets config for versioning
├── ROADMAP.md
├── ARCHITECTURE.md        ← this file
├── CONTRIBUTING.md
└── CODING_STANDARDS.md
```

**Workspace manager**: npm workspaces
**Node requirement**: >=18.0.0

---

## 2. System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  CONSUMER APPLICATIONS                   │
│                                                          │
│  React App          Angular App        Vanilla HTML      │
│  @mayvio-ui/react   @mayvio-ui/angular mayvio-ui (CDN)   │
└──────────┬──────────────────┬──────────────┬─────────────┘
           │                  │              │
           ▼                  ▼              ▼
┌──────────────────────────────────────────────────────────┐
│               FRAMEWORK WRAPPERS (Layer 3)               │
│  packages/react              packages/angular            │
│  • Typed React props         • Standalone components     │
│  • useEffect lifecycle       • OnPush change detection   │
│  • SSR-safe DOM access       • OnInit/OnDestroy cleanup  │
│  • Per-component exports     • Secondary entry points    │
└──────────────────────────┬───────────────────────────────┘
                           │  imports from
                           ▼
┌──────────────────────────────────────────────────────────┐
│                  CORE PACKAGE (Layer 2)                  │
│  packages/core                                           │
│  • Design tokens (CSS variables, --mv-* prefix)          │
│  • BEM component CSS (.mv-badge, .mv-badge--success)     │
│  • Vanilla JS init functions (framework-agnostic)        │
│  • Per-component exports map                             │
└──────────────────────────────────────────────────────────┘
                           │  documented by
                           ▼
┌──────────────────────────────────────────────────────────┐
│                DOCS SITE (apps/docs)                     │
│  Next.js 14 (App Router)                                 │
│  • Inline Monaco editor (live preview)                   │
│  • StackBlitz POST integration (no API key)              │
│  • CodeSandbox POST integration (no API key)             │
│  • Auto-generated Props tables from TypeScript types     │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Package Dependency Graph

```
apps/docs
    ├── @mayvio-ui/react   (for React demos)
    └── mayvio-ui          (for CSS)

@mayvio-ui/react
    └── mayvio-ui (peer + dependency for CSS + JS)

@mayvio-ui/angular
    └── mayvio-ui (peer + dependency for CSS + JS)

mayvio-ui
    └── (no dependencies — pure CSS + JS)
```

---

## 4. Design Token System

All visual values are defined as CSS custom properties in `packages/core/src/tokens/`.
Every value in a component CSS file **must** reference a token — no hardcoded values.

### Token Files

```
src/tokens/
├── color.css       → --mv-color-{semantic}-{shade}
├── spacing.css     → --mv-space-{1..16}
├── typography.css  → --mv-text-{size}, --mv-font-{family}
├── radius.css      → --mv-radius-{sm|md|lg|xl|full}
├── shadow.css      → --mv-shadow-{sm|md|lg}
├── animation.css   → --mv-duration-{fast|normal|slow}
└── index.css       → @import all of the above
```

### Token Naming Convention

```
--mv-{category}-{semantic}-{variant}

Examples:
  --mv-color-success           → #22c55e
  --mv-color-success-bg        → color-mix(in srgb, #22c55e 15%, transparent)
  --mv-color-success-text      → #15803d (darker, for readability)
  --mv-space-4                 → 16px (1rem)
  --mv-radius-full             → 9999px
  --mv-duration-fast           → 150ms
```

### Dark Mode

Dark mode works entirely via CSS variables. No JavaScript theme switching.

```css
:root { --mv-color-bg: #ffffff; }
[data-theme="dark"] { --mv-color-bg: #0f172a; }
```

Consumer sets `data-theme="dark"` on `<html>` or `<body>`. No JS required from Mayvio.

---

## 5. Component Layer Stack

For any given component (e.g. Badge), data flows through 4 layers:

```
Layer 1 — Token
  packages/core/src/tokens/color.css
  --mv-color-info: #3b82f6;
  --mv-color-info-bg: color-mix(in srgb, #3b82f6 15%, transparent);

Layer 2 — Core CSS
  packages/core/src/components/badge/badge.css
  .mv-badge--info {
    background: var(--mv-color-info-bg);
    color: var(--mv-color-info);
  }

Layer 3A — React Wrapper
  packages/react/src/Badge/Badge.tsx
  <span className={`mv-badge mv-badge--${variant}`}>{children}</span>

Layer 3B — Angular Wrapper
  packages/angular/src/badge/badge.component.ts
  @Component({ standalone: true, host: { '[class]': 'hostClasses' } })
  <ng-content></ng-content>

Layer 4 — Consumer
  <Badge variant="info">Label</Badge>          // React
  <mv-badge variant="info">Label</mv-badge>    // Angular
  <span class="mv-badge mv-badge--info">...</span> // Vanilla
```

---

## 6. CSS Naming Convention (BEM)

Pattern: `.mv-{component}__{element}--{modifier}`

```css
/* Component root */
.mv-badge { }

/* Element (child of component) */
.mv-alert__icon { }
.mv-alert__title { }
.mv-alert__close { }

/* Modifier (state or variant) */
.mv-badge--success { }
.mv-badge--dot { }
.mv-badge--outline { }
.mv-badge--sm { }
```

Rules:
- All classes prefixed with `mv-` (prevents collision with consumer CSS)
- Double underscore `__` separates element
- Double dash `--` separates modifier
- No deeply nested selectors (max 2 levels)

---

## 7. Per-Component Exports Map

### Core (`mayvio-ui`)

```json
{
  "exports": {
    ".":           "./src/index.js",
    "./css":       "./src/tokens/index.css",
    "./badge":     "./src/components/badge/index.js",
    "./badge/css": "./src/components/badge/badge.css",
    "./alert":     "./src/components/alert/index.js",
    "./alert/css": "./src/components/alert/alert.css"
  }
}
```

### React (`@mayvio-ui/react`)

```json
{
  "sideEffects": false,
  "exports": {
    ".":        { "import": "./dist/index.mjs",       "require": "./dist/index.js"       },
    "./Badge":  { "import": "./dist/Badge/index.mjs", "require": "./dist/Badge/index.js" },
    "./Alert":  { "import": "./dist/Alert/index.mjs", "require": "./dist/Alert/index.js" }
  }
}
```

### Angular (`@mayvio-ui/angular`)

Angular uses `ng-packagr` secondary entry points. Each component gets its own subfolder:

```
packages/angular/
  badge/
    ng-package.json   ← { "lib": { "entryFile": "index.ts" } }
    index.ts          ← export { BadgeComponent } from '../src/badge'
```

Consumer usage:
```typescript
import { BadgeComponent } from '@mayvio-ui/angular';        // Full barrel
import { BadgeComponent } from '@mayvio-ui/angular/badge';  // Just Badge
```

---

## 8. React Component Rules

1. **Named exports only** — `export function Badge()`, never `export default Badge`
2. **SSR guard** — `if (typeof window === 'undefined') return;` in DOM-touching effects
3. **Effect cleanup** — every `useEffect` that adds event listeners must `return () => cleanup()`
4. **Props extend HTML** — `interface BadgeProps extends HTMLAttributes<HTMLSpanElement>`
5. **Spread remaining props** — `<span {...rest}>` to support aria-*, data-*, etc.
6. **`'use client'`** — required at top of any component using `useState`, `useEffect`

---

## 9. Angular Component Rules

1. **`standalone: true`** — all components, no NgModule declarations
2. **`ChangeDetectionStrategy.OnPush`** — all components for performance
3. **`ngOnDestroy()`** — required on every component that adds event listeners
4. **Typed `@Input()`** — no `any`, always strict types with defaults
5. **Host binding** — use `host: { '[class]': 'hostClasses' }` to apply classes to root
6. **Selector prefix** — `mv-` (e.g. `<mv-badge>`, `<mv-alert>`)

---

## 10. Build Tools

| Package | Tool | Command | Output |
|---|---|---|---|
| `packages/core` | (none, pure source) | n/a | `src/` directly consumed |
| `packages/react` | `tsup` | `tsup src/index.ts` | `dist/*.mjs` + `dist/*.js` + `dist/*.d.ts` |
| `packages/angular` | `ng-packagr` | `ng-packagr -p ng-package.json` | `dist/` with Ivy partial compilation |
| `apps/docs` | Next.js | `next build` | `.next/` |

---

## 11. Testing Strategy

### Test Pyramid

```
          /\
         /  \   E2E (Playwright) — Modal, Dropdown, CommandPalette
        /----\
       /      \  Integration — component interactions, form state
      /--------\
     /          \ Unit (Vitest + Testing Library) — every component
    /____________\
```

### Required Tests per Component

Every component **must** have before it can be merged:

1. **Unit tests** (`Component.test.tsx` / `component.component.spec.ts`)
   - Renders without crashing
   - Each prop variant renders correct class
   - HTML attribute passthrough works
2. **Accessibility tests** (`Component.a11y.test.tsx`)
   - Zero `axe` violations with default props
   - Zero violations for every variant
3. **Snapshot tests** — catch unintended HTML structure changes

### Test Commands

```bash
# All tests
npm test --workspaces

# React only
cd packages/react && npm test

# Angular only
cd packages/angular && npm test

# With coverage
npm test -- --coverage
```

---

## 12. CI/CD Pipeline

```
PR opened
    │
    ├── lint.yml
    │     ├── eslint (all packages)
    │     └── prettier check
    │
    ├── test.yml
    │     ├── npm test (packages/react)
    │     └── npm test (packages/angular)
    │
    └── build.yml
          ├── npm run build (packages/core)
          ├── npm run build (packages/react)
          ├── npm run build (packages/angular)
          └── npm run build (apps/docs)

Merge to main
    │
    └── release.yml (Changesets)
          ├── Create "Version Packages" PR (auto)
          └── On merge: npm publish (packages/*)
                        Deploy docs to Vercel
```

---

## 13. Versioning

This project uses [Changesets](https://github.com/changesets/changesets).

```bash
# Before merging any feature PR:
npx changeset

# This prompts you to:
# 1. Select which packages changed
# 2. Select bump type: major | minor | patch
# 3. Write a summary (becomes CHANGELOG entry)
```

**Version bump rules:**
- `patch` — bug fixes, internal refactoring, docs
- `minor` — new component, new props, new features (backwards compatible)
- `major` — CSS class renames, API changes, removed props (breaking)

---

## 14. Breaking Changes (v4.0.0)

The following changes ship in v4.0.0 and are **not backwards compatible**:

| What changed | Old | New |
|---|---|---|
| CSS class prefix | `.badge` | `.mv-badge` |
| CSS modifier style | `.badge.success` | `.mv-badge--success` |
| CSS element style | `.alert-icon` | `.mv-alert__icon` |
| CSS token prefix | `--bg` | `--mv-color-bg` |
| CSS token prefix | `--success` | `--mv-color-success` |
| Angular selector | `<mayvio-badge>` | `<mv-badge>` |
| Angular module | `MayvioUIModule` | kept + standalone preferred |

See `MIGRATION.md` for the full migration guide.
