# Mayvio UI — Roadmap

> Last updated: 2026-06-14
> This is the single source of truth for project direction.
> All phases, milestones, and component targets are tracked here.

---

## Vision

Mayvio UI is a multi-framework UI component library that provides a premium set of accessible, beautifully designed components for **React**, **Angular**, and **Vanilla HTML** — with a world-class documentation site featuring live in-browser code editing.

**North Star**: Be the go-to UI library for Angular developers (a gap MUI, Chakra, and shadcn don't fill) while remaining a first-class React and Vanilla library.

---

## Release Strategy

| Version | Target | What Ships |
|---|---|---|
| `v4.0.0-alpha.1` | Phase 1-2 complete | PoC: Badge, Alert, Avatar with new architecture |
| `v4.0.0-beta.1`  | Phase 3 complete   | All Tier 2 components, docs site live |
| `v4.0.0`         | Phase 4 complete   | Full component set, stable API |
| `v4.1.0`         | Phase 5 complete   | Data components (DataGrid, Chart) |
| `v5.0.0`         | Phase 6-7 complete | Storybook, full test coverage, Figma kit |

> ⚠️ v4.0.0 is a **BREAKING CHANGE** from v3.x:
> - CSS classes renamed: `.badge` → `.mv-badge`
> - CSS tokens renamed: `--bg` → `--mv-color-bg`
> - Angular selector changed: `mayvio-badge` → `mv-badge`
> - Full migration guide in `MIGRATION.md`

---

## Phase 1 — Monorepo Foundation
**Status**: 🔴 Not started | **Target**: Week 1

### Goals
- Clean, shared tooling across all packages
- TypeScript strict mode enforced everywhere
- Pre-commit hooks prevent bad code from entering the repo

### Deliverables
- [ ] Root `tsconfig.base.json` (strict mode)
- [ ] Root `.eslintrc.json` (shared rules)
- [ ] Root `.prettierrc`
- [ ] `husky` + `lint-staged` pre-commit hooks
- [ ] `.editorconfig`
- [ ] Root `package.json` scripts: `build:all`, `test:all`, `lint:all`
- [ ] Updated `CONTRIBUTING.md`

---

## Phase 2 — PoC: Badge, Alert, Avatar
**Status**: 🔴 Not started | **Target**: Week 1-2

> Complete proof-of-concept for the new architecture using 3 representative components.
> These 3 components validate every layer before we scale to all 48 components.

### Why these 3?
| Component | What it validates |
|---|---|
| **Badge** | CSS-only component. Validates token rename, folder structure, exports map. |
| **Alert** | Has vanilla JS. Validates JS init → React lifecycle → Angular lifecycle chain. |
| **Avatar** | Compound component (Avatar + AvatarGroup). Validates multi-export pattern. |

### Deliverables per component (must all be done before moving on)

**Core (`packages/core`)**
- [ ] Folder: `src/components/{component}/`
- [ ] CSS: `{component}.css` with `mv-` prefixed BEM classes
- [ ] JS (if applicable): `{component}.js` with scoped init function
- [ ] Types: `index.ts` exporting config interface
- [ ] `package.json` exports map updated

**React (`packages/react`)**
- [ ] `{Component}/Badge.types.ts` — strict TypeScript interfaces
- [ ] `{Component}/Badge.test.tsx` — written FIRST (TDD)
- [ ] `{Component}/Badge.a11y.test.tsx` — axe accessibility tests
- [ ] `{Component}/Badge.tsx` — implementation
- [ ] `{Component}/index.ts` — named exports
- [ ] All tests green (`npm test`)
- [ ] `package.json` exports map updated
- [ ] `tsup.config.ts` entry point added

**Angular (`packages/angular`)**
- [ ] `src/{component}/{component}.component.spec.ts` — written FIRST (TDD)
- [ ] `src/{component}/{component}.component.ts` — `standalone: true`, typed `@Input()`
- [ ] `src/{component}/index.ts` — named export
- [ ] Secondary entry point: `{component}/ng-package.json` + `index.ts`
- [ ] All tests green (`npm test`)
- [ ] `public-api.ts` updated

**Docs (`apps/docs`)**
- [ ] Component page: `app/components/{component}/page.tsx`
- [ ] At least 3 `<LiveDemo>` sections
- [ ] `<PropsTable>` with all props documented
- [ ] StackBlitz button works
- [ ] CodeSandbox button works

---

## Phase 3 — Core Components (Tier 2)
**Status**: 🟡 In Progress | **Target**: Week 2-4

> Scale the proven architecture to all foundational components.

### Components
| # | Component | Complexity | Status |
|---|---|---|---|
| 4 | Button | Low | ✅ |
| 5 | Tooltip | Medium | ✅ |
| 6 | Toast | Medium | ✅ |
| 7 | Skeleton | Low | ✅ |
| 8 | ProgressBar | Low | ✅ |
| 9 | Breadcrumb | Low | ✅ |
| 10 | Tabs | Medium | ✅ |
| 11 | Accordion | Medium | ✅ |
| 12 | ThemeToggle | Low | ✅ |

### Docs Site MVP
- [ ] Next.js app scaffolded (`apps/docs`)
- [ ] `<AppShell>` layout with sidebar navigation
- [ ] `<LiveDemo>` component with Monaco editor
- [ ] `<PropsTable>` component
- [ ] `<ComponentHeader>` with install command
- [ ] StackBlitz integration (`lib/openStackBlitz.ts`)
- [ ] CodeSandbox integration (`lib/openCodeSandbox.ts`)
- [ ] Dark mode support
- [ ] Deployed to Vercel

---

## Phase 4 — Interaction Components (Tier 3)
**Status**: ✅ Complete | **Target**: Week 4-6

| # | Component | Complexity | Status |
|---|---|---|---|
| 13 | Modal | High | ✅ |
| 14 | Dropdown | High | ✅ |
| 15 | MultiSelect | High | ✅ |
| 16 | DatePicker | Very High | ✅ |
| 17 | FileUpload | High | ✅ |
| 18 | CommandPalette | Very High | ✅ |
| 19 | Sidebar | Medium | ✅ |
| 20 | NotificationCenter | High | ✅ |

---
## Phase 5 — Form Primitives (Tier 5 — New)
**Status**: ✅ Complete | **Target**: Week 6-8

> These are missing from v3.x entirely. Every serious app needs them.

| # | Component | Status |
|---|---|---|
| 21 | Input / TextField | ✅ |
| 22 | Checkbox | ✅ |
| 23 | RadioGroup | ✅ |
| 24 | Switch / Toggle | ✅ |
| 25 | Select | ✅ |
| 26 | Textarea | ✅ |
| 27 | Slider | ✅ |
---

## Phase 6 — Data & Dashboard Components (Tier 4)
**Status**: 🔴 Not started | **Target**: Week 8-12

| # | Component | Complexity | Status |
|---|---|---|---|
| 28 | DataGrid | Very High | 🔴 |
| 29 | Chart | Very High | 🔴 |
| 30 | KpiCard | Medium | 🔴 |
| 31 | DashboardWidget | Medium | 🔴 |
| 32 | ActivityTimeline | Medium | 🔴 |
| 33 | CodeSnippet | Medium | 🔴 |

---

## Phase 7 — Quality, Polish & Launch
**Status**: 🔴 Not started | **Target**: Week 12-16

### Testing
- [ ] `>80%` test coverage across all packages
- [ ] Visual regression tests via Chromatic + Storybook
- [ ] E2E tests for critical flows (Modal, Dropdown, CommandPalette)
- [ ] Automated a11y checks on all 48 components

### Documentation
- [ ] All 48 component pages complete
- [ ] Getting started guides: React, Angular, Vanilla
- [ ] Migration guide: v3.x → v4.0.0
- [ ] Design tokens reference page
- [ ] Figma community file published

### DevEx
- [ ] Storybook added to `packages/react`
- [ ] Changesets configured and tested
- [ ] GitHub Actions CI running on every PR
- [ ] Automated NPM publish on merge to `main`

### Launch
- [ ] Public v4.0.0 release on NPM
- [ ] GitHub Discussions enabled
- [ ] `CHANGELOG.md` auto-generated
- [ ] Custom docs domain live

---

## Full Component Registry (48 components)

### Tier 1 — PoC (3 components)
`Badge` · `Alert` · `Avatar`

### Tier 2 — Core (9 components)
`Button` · `Tooltip` · `Toast` · `Skeleton` · `ProgressBar` · `Breadcrumb` · `Tabs` · `Accordion` · `ThemeToggle`

### Tier 3 — Interaction (8 components)
`Modal` · `Dropdown` · `MultiSelect` · `DatePicker` · `FileUpload` · `CommandPalette` · `Sidebar` · `NotificationCenter`

### Tier 4 — Data (6 components)
`DataGrid` · `Chart` · `KpiCard` · `DashboardWidget` · `ActivityTimeline` · `CodeSnippet`

### Tier 5 — Form Primitives (7 components) — NEW in v4
`Input` · `Checkbox` · `RadioGroup` · `Switch` · `Select` · `Textarea` · `Slider`

### Tier 6 — Extra (15 components) — Future
`Chip` · `Spinner` · `Divider` · `Stepper` · `Pagination` · `Table` · `Card` · `List` · `Menu` · `Drawer` · `Snackbar` · `Rating` · `TreeView` · `ColorPicker` · `Tag`
