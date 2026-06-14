# Contributing to Mayvio UI

Welcome! This document covers everything you need to know to contribute to Mayvio UI.

**Before writing any code, read:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) — how the system is structured
2. [CODING_STANDARDS.md](./CODING_STANDARDS.md) — rules every line of code must follow
3. This file — the contribution workflow

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/your-org/mayvio-ui.git
cd mayvio-ui
npm install

# Build everything
npm run build:all

# Run all tests
npm run test:all

# Start the docs site
npm run dev:docs

# Start the React playground
npm run dev:playground
```

---

## Branch Strategy

```
main          ← stable, deployable at all times
  │
  ├── feat/badge-component        ← feature branches (PRs target main)
  ├── fix/alert-memory-leak       ← bug fixes
  ├── docs/badge-page             ← docs-only changes
  ├── refactor/angular-standalone ← refactoring
  └── test/badge-a11y             ← test-only changes
```

**Rules:**
- Never push directly to `main`
- Every change goes through a PR
- PRs require at least one passing CI run before merge

---

## How to Add a New Component

Follow this exact order. Do not skip steps.

### Step 1 — Core Package

```bash
# Create the component folder
mkdir -p packages/core/src/components/{name}
touch packages/core/src/components/{name}/{name}.css
touch packages/core/src/components/{name}/index.ts
# If it needs JS:
touch packages/core/src/components/{name}/{name}.js
```

In `{name}.css`:
- Use `mv-` prefix on all classes: `.mv-{name}`, `.mv-{name}--{modifier}`
- Use `var(--mv-*)` tokens for all values — no hardcoded colours, sizes, etc.

In `index.ts`:
```typescript
export type { {Name}Config } from './{name}.js';   // if JS exists
export { init{Name} } from './{name}.js';           // if JS exists
```

Update `packages/core/package.json` exports:
```json
"./{name}":     "./src/components/{name}/index.js",
"./{name}/css": "./src/components/{name}/{name}.css"
```

### Step 2 — React Package (TDD)

**Write the types file first:**
```bash
mkdir -p packages/react/src/{Name}
touch packages/react/src/{Name}/{Name}.types.ts
```

**Write the tests second (RED phase):**
```bash
touch packages/react/src/{Name}/{Name}.test.tsx
touch packages/react/src/{Name}/{Name}.a11y.test.tsx
```

Run `npm test` — tests MUST fail at this point. If they pass, the tests are wrong.

**Write the component third (GREEN phase):**
```bash
touch packages/react/src/{Name}/{Name}.tsx
touch packages/react/src/{Name}/index.ts
```

Run `npm test` — all tests must now pass.

Update `packages/react/src/index.ts`:
```typescript
export * from './{Name}';
```

Update `packages/react/package.json` exports:
```json
"./{Name}": {
  "import":  { "types": "./dist/{Name}/index.d.mts", "default": "./dist/{Name}/index.mjs" },
  "require": { "types": "./dist/{Name}/index.d.ts",  "default": "./dist/{Name}/index.js"  }
}
```

Update `packages/react/tsup.config.ts`:
```typescript
'{Name}/index': 'src/{Name}/index.ts',
```

### Step 3 — Angular Package (TDD)

**Write the spec file first (RED phase):**
```bash
mkdir -p packages/angular/src/{name}
touch packages/angular/src/{name}/{name}.component.spec.ts
touch packages/angular/src/{name}/index.ts
```

Run `npm test` in `packages/angular` — must fail.

**Write the component second (GREEN phase):**
```bash
touch packages/angular/src/{name}/{name}.component.ts
```

Run `npm test` — must pass.

**Create the secondary entry point:**
```bash
mkdir -p packages/angular/{name}
touch packages/angular/{name}/ng-package.json
touch packages/angular/{name}/index.ts
```

`ng-package.json`:
```json
{ "lib": { "entryFile": "index.ts" } }
```

`index.ts`:
```typescript
export { {Name}Component } from '../src/{name}';
```

Update `packages/angular/src/public-api.ts`:
```typescript
export * from './{name}';
```

Update `packages/angular/ng-package.json` to include the new entry:
```json
{
  "lib": { "entryFile": "src/public-api.ts" },
  "allowedNonPeerDependencies": [],
  "assets": []
}
```
(ng-packagr auto-discovers secondary entries from subfolders)

### Step 4 — Docs Page

```bash
mkdir -p apps/docs/app/components/{name}
touch apps/docs/app/components/{name}/page.tsx
```

Every docs page must have:
- `<ComponentHeader>` with name, description, and install command
- Minimum 3 `<LiveDemo>` sections
- `<PropsTable>` for each exported type
- Working StackBlitz button on every demo
- Working CodeSandbox button on every demo

### Step 5 — Create Changeset

```bash
npx changeset
# Select all packages that changed
# Choose bump type (patch / minor / major)
# Write a one-line summary
```

### Step 6 — PR Checklist

Before opening a PR, confirm every item:

- [ ] Tests written BEFORE implementation (TDD — Red then Green)
- [ ] All tests pass: `npm test --workspaces`
- [ ] No `any` types anywhere in the new code
- [ ] No `@ts-nocheck` anywhere
- [ ] Every `@Input()` has a JSDoc comment
- [ ] Every React prop has a JSDoc comment
- [ ] `ngOnDestroy()` present if Angular component adds event listeners
- [ ] `return () => cleanup()` present in React effects that add listeners
- [ ] SSR guard (`typeof window !== 'undefined'`) in DOM-touching effects
- [ ] Component exported from `src/index.ts` barrel
- [ ] Component added to `package.json` exports map
- [ ] Docs page created with working live demos
- [ ] Changeset file created

---

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/).

```
{type}({scope}): {description}

Types:
  feat      → new component or feature
  fix       → bug fix
  docs      → documentation only
  test      → tests only
  refactor  → code change with no feature/bug
  style     → formatting, no logic change
  chore     → build, CI, tooling

Scopes:
  badge, alert, avatar, react, angular, core, docs, ci

Examples:
  feat(badge): add standalone Angular component with OnPush detection
  fix(alert): remove memory leak in dismiss event listener
  docs(badge): add live demo page with StackBlitz integration
  test(avatar): add a11y tests for AvatarGroup overflow
  refactor(core): rename CSS classes to mv- BEM convention
```

---

## Code Review Guidelines

### For Reviewers

- Check that tests came **before** implementation (look at commit history)
- Verify no `any` types or `@ts-nocheck`
- Verify `ngOnDestroy` cleanup on Angular components
- Verify `return () => cleanup()` on React effects
- Verify the docs page has working StackBlitz/CodeSandbox buttons
- Check that the CSS only uses `var(--mv-*)` tokens — no hardcoded values
- Check that class names follow BEM: `.mv-{component}--{modifier}`

### For Authors

- Keep PRs focused — one component per PR when possible
- Link to the relevant task in the PR description
- Add screenshots of the docs page in the PR description
- Self-review using the checklist above before requesting review

---

## Environment Setup

### Required
- Node.js >= 18.0.0
- npm >= 9.0.0

### Recommended VS Code Extensions
- ESLint
- Prettier
- Angular Language Service
- vscode-styled-components

### Useful Commands

```bash
# Build individual packages
npm run build --workspace=packages/core
npm run build --workspace=packages/react
npm run build --workspace=packages/angular

# Test individual packages
npm test --workspace=packages/react
npm test --workspace=packages/angular

# Lint all
npm run lint:all

# Format all
npm run format:all

# Start docs dev server
npm run dev --workspace=apps/docs

# Create a changeset
npx changeset

# Preview what will be published
npx changeset status
```
