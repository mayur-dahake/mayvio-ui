# Mayvio UI — Implementation Plan (v4.0.0)

> This document tracks active execution. Update status as you work.
> Status: `[ ]` Todo · `[/]` In progress · `[x]` Done · `[-]` Skipped

---

## Active Phase: Phase 1 — Monorepo Foundation

### Phase 1.1 — Root Config
- [x] Verify `workspaces: ["packages/*", "apps/*"]` in root `package.json`
- [x] Add `engines: { node: ">=18.0.0" }` to root `package.json`
- [x] Add root scripts: `build:all`, `test:all`, `lint:all`, `dev:docs`
- [x] Create `tsconfig.base.json` with `strict: true`

### Phase 1.2 — Linting & Formatting
- [x] Install `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- [x] Create `.eslintrc.json` (shared rules for all packages)
- [x] Install `prettier`
- [x] Create `.prettierrc`
- [x] Create `.editorconfig`

### Phase 1.3 — Pre-commit Hooks
- [x] Install `husky` and `lint-staged`
- [x] Configure `.husky/pre-commit` to run `lint-staged`
- [x] Configure `lint-staged` in root `package.json`:
  ```json
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.css": ["prettier --write"]
  }
  ```

---

## Phase 2 — PoC: Badge, Alert, Avatar

> **TDD Order**: types → tests (RED) → implementation (GREEN) → refactor

---

### Phase 2.1 — Design Tokens (Core)

- [x] Create `packages/core/src/tokens/` directory
- [x] Create `packages/core/src/tokens/color.css` with `--mv-color-*` tokens
- [x] Create `packages/core/src/tokens/spacing.css` with `--mv-space-*` tokens
- [x] Create `packages/core/src/tokens/typography.css`
- [x] Create `packages/core/src/tokens/radius.css`
- [x] Create `packages/core/src/tokens/shadow.css`
- [x] Create `packages/core/src/tokens/animation.css`
- [x] Create `packages/core/src/tokens/index.css` importing all token files
- [x] Update `packages/core/package.json` exports:
  ```json
  "./css": "./src/tokens/index.css"
  ```

---

### Phase 2.2 — Badge

#### 2.2.1 Core (Badge)
- [x] Create `packages/core/src/components/badge/`
- [x] Create `badge.css` using `mv-` BEM classes + `--mv-*` tokens
- [x] Create `index.ts` (type-only export for `BadgeConfig`)
- [x] Update `packages/core/package.json`:
  ```json
  "./badge": "./src/components/badge/index.js",
  "./badge/css": "./src/components/badge/badge.css"
  ```

#### 2.2.2 React (Badge) — TDD
- [x] Create `packages/react/src/Badge/Badge.types.ts`
- [x] Create `packages/react/src/Badge/Badge.test.tsx` ← **RED phase first**
- [x] Create `packages/react/src/Badge/Badge.a11y.test.tsx` ← **RED phase first**
- [x] Run `npm test` — confirm tests FAIL (RED) ✓
- [x] Create `packages/react/src/Badge/Badge.tsx` ← **GREEN phase**
- [x] Run `npm test` — confirm tests PASS (GREEN) ✓
- [x] Create `packages/react/src/Badge/index.ts`
- [x] Update `packages/react/src/index.ts` barrel
- [x] Update `packages/react/package.json` exports map
- [x] Update `packages/react/tsup.config.ts` entry points
- [x] Run `npm run build` — verify `dist/Badge/index.mjs` exists

#### 2.2.3 Angular (Badge) — TDD
- [x] Create `packages/angular/src/badge/badge.component.spec.ts` ← **RED phase first**
- [x] Run `npm test` — confirm tests FAIL (RED) ✓
- [x] Create `packages/angular/src/badge/badge.component.ts` ← **GREEN phase**
- [x] Create `packages/angular/src/badge/index.ts`
- [x] Run `npm test` — confirm tests PASS (GREEN) ✓
- [x] Create `packages/angular/badge/ng-package.json`
- [-] Create `packages/angular/badge/index.ts` (not needed — ng-package.json points to src directly)
- [x] Update `packages/angular/src/public-api.ts`
- [x] Run `npm run build` — verify `dist/badge/` exists

#### 2.2.4 Docs (Badge)
- [ ] Create `apps/docs/app/components/badge/page.tsx`
- [ ] Demo 1: All variants (success, error, warning, info)
- [ ] Demo 2: Sizes (sm, md, lg)
- [ ] Demo 3: Dot + outline modifiers
- [ ] `<PropsTable>` with all props
- [ ] Verify StackBlitz opens correctly
- [ ] Verify CodeSandbox opens correctly

---

### Phase 2.3 — Alert

#### 2.3.1 Core (Alert)
- [x] Create `packages/core/src/components/alert/`
- [x] Move and rename CSS: `alert.css` → uses `mv-alert` BEM classes
- [x] Create `index.ts` exporting `AlertConfig`
- [x] Update `packages/core/package.json` exports

#### 2.3.2 React (Alert) — TDD
- [x] `Alert.types.ts`
- [x] `Alert.test.tsx` ← RED first
- [x] `Alert.a11y.test.tsx` ← RED first
- [x] Run tests → FAIL ✓
- [x] `Alert.tsx` ← GREEN (21 tests passing)
- [x] Run tests → PASS ✓
- [x] `index.ts`
- [x] Update barrel + exports map + tsup config
- [x] Build verification — `dist/Alert/index.mjs` exists

#### 2.3.3 Angular (Alert) — TDD
- [x] `alert.component.spec.ts` ← RED first
- [x] Run tests → FAIL ✓
- [x] `alert.component.ts` ← GREEN (standalone, OnPush, Signals)
- [x] `index.ts`
- [x] Run tests → PASS ✓ (18 tests passing)
- [x] Secondary entry point: `packages/angular/alert/`
- [x] Update `public-api.ts` — AlertComponent moved to standalone
- [x] Build verification — `dist/alert/` exists

#### 2.3.4 Docs (Alert)
- [ ] Create `apps/docs/app/components/alert/page.tsx`
- [ ] Demo 1: All variants
- [ ] Demo 2: With title + dismissible
- [ ] Demo 3: Controlled (custom onDismiss callback)
- [ ] `<PropsTable>`
- [ ] StackBlitz works
- [ ] CodeSandbox works

---

### Phase 2.4 — Avatar

#### 2.4.1 Core (Avatar)
- [ ] Create `packages/core/src/components/avatar/`
- [ ] Move and rename CSS: `avatar.css` → uses `mv-avatar` BEM classes
- [ ] No JS needed (pure CSS component)
- [ ] Create `index.ts` (type-only for `AvatarConfig`)
- [ ] Update exports

#### 2.4.2 React (Avatar) — TDD
- [ ] `Avatar.types.ts` (includes `AvatarProps` + `AvatarGroupProps`)
- [ ] `Avatar.test.tsx` ← RED first (tests both Avatar + AvatarGroup)
- [ ] `Avatar.a11y.test.tsx` ← RED first
- [ ] Run tests → FAIL ✓
- [ ] `Avatar.tsx` ← GREEN (exports Avatar + AvatarGroup)
- [ ] Run tests → PASS ✓
- [ ] `index.ts` (exports both components + both type sets)
- [ ] Update barrel + exports map + tsup config
- [ ] Build verification

#### 2.4.3 Angular (Avatar) — TDD
- [ ] `avatar.component.spec.ts` ← RED first (tests AvatarComponent + AvatarGroupComponent)
- [ ] Run tests → FAIL ✓
- [ ] `avatar.component.ts` ← GREEN (two components in one file)
- [ ] `index.ts`
- [ ] Run tests → PASS ✓
- [ ] Secondary entry point: `packages/angular/avatar/`
- [ ] Update `public-api.ts`
- [ ] Build verification

#### 2.4.4 Docs (Avatar)
- [ ] Create `apps/docs/app/components/avatar/page.tsx`
- [ ] Demo 1: Sizes + shapes
- [ ] Demo 2: Image + initials fallback
- [ ] Demo 3: AvatarGroup with overflow
- [ ] `<PropsTable>` for Avatar + AvatarGroup
- [ ] StackBlitz works
- [ ] CodeSandbox works

---

### Phase 2.5 — Docs Site Foundation

> Build the docs app structure before/during the PoC component pages.

- [ ] Scaffold `apps/docs`: `npx create-next-app@latest apps/docs --typescript --eslint --app`
- [ ] Install deps: `@monaco-editor/react`, `next-themes`, `codesandbox`
- [ ] Configure `next.config.ts` to transpile `@mayvio-ui/react`
- [ ] Create `<AppShell>` layout (sidebar + topbar)
- [ ] Create left sidebar nav with component links grouped by tier
- [ ] Create `<TopBar>` with dark mode toggle + GitHub link
- [ ] Create `<ComponentHeader>` component
- [ ] Create `<LiveDemo>` component with Monaco editor + preview
- [ ] Create `<PropsTable>` component
- [ ] Create `lib/openStackBlitz.ts`
- [ ] Create `lib/openCodeSandbox.ts`
- [ ] Create `lib/useLivePreview.ts` (Babel standalone + render hook)
- [ ] Create home page (`/`)
- [ ] Create Getting Started page (`/getting-started`)
- [ ] Deploy to Vercel

---

### Phase 2.6 — PoC Verification

Before moving to Phase 3, verify every item:

- [ ] `npm test --workspaces` — all tests pass
- [ ] `npm run build --workspaces` — all packages build
- [ ] React: `import { Badge } from '@mayvio-ui/react'` — works
- [ ] React: `import { Badge } from '@mayvio-ui/react/Badge'` — works (subpath)
- [ ] Angular: `import { BadgeComponent } from '@mayvio-ui/angular'` — works
- [ ] Angular: `import { BadgeComponent } from '@mayvio-ui/angular/badge'` — works
- [ ] Docs: `/components/badge` — StackBlitz button opens working demo
- [ ] Docs: `/components/badge` — CodeSandbox button opens working demo
- [ ] Docs: `/components/badge` — Monaco editor live preview works
- [ ] Zero TypeScript errors in all packages
- [ ] Zero ESLint errors in all packages
- [ ] Changeset created for v4.0.0-alpha.1

---

## Phase 3 — Tier 2 Components

> Template: repeat Phase 2.x pattern for each component.

- [x] Button (4)
- [x] Tooltip (5)
- [x] Toast (6)
- [x] Skeleton (7)
- [x] ProgressBar (8)
- [x] Breadcrumb (9)
- [x] Tabs (10)
- [x] Accordion (11)
- [x] ThemeToggle (12)
- [ ] Changeset for v4.0.0-beta.1

---

## Phase 4 — Tier 3 Interaction Components

- [ ] Modal (13)
- [ ] Dropdown (14)
- [ ] MultiSelect (15)
- [ ] DatePicker (16)
- [ ] FileUpload (17)
- [ ] CommandPalette (18)
- [ ] Sidebar (19)
- [ ] NotificationCenter (20)
- [ ] Changeset for v4.0.0-rc.1

---

## Phase 5 — Form Primitives (New in v4)

- [ ] Input / TextField (21)
- [ ] Checkbox (22)
- [ ] RadioGroup (23)
- [ ] Switch (24)
- [ ] Select (25)
- [ ] Textarea (26)
- [ ] Slider (27)

---

## Phase 6 — Data Components

- [ ] DataGrid (28)
- [ ] Chart (29)
- [ ] KpiCard (30)
- [ ] DashboardWidget (31)
- [ ] ActivityTimeline (32)
- [ ] CodeSnippet (33)
- [ ] Changeset for v4.0.0

---

## Phase 7 — Quality & Launch

- [ ] Test coverage > 80% in all packages
- [ ] Storybook added to `packages/react`
- [ ] Chromatic visual regression on all components
- [ ] Migration guide `MIGRATION.md` (v3.x → v4.0.0)
- [ ] All 33 docs pages complete with live demos
- [ ] Custom docs domain configured
- [ ] GitHub Actions CI on every PR
- [ ] Automated NPM publish via Changesets
- [ ] Figma community file published
- [ ] v4.0.0 published to NPM
