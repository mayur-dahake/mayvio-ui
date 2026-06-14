# Mayvio UI — Coding Standards

> This is the law. Every line of code in every package must follow these rules.
> No exceptions. No `@ts-nocheck`. No `any`.

---

## 1. Framework Decision

**Docs site**: Next.js 14+ (App Router)
- Reason: SSR for SEO, component pages must be indexable by Google
- MUI, Chakra UI, Radix UI all use Next.js for their docs

**Testing**: Vitest + @testing-library/react (React), @angular/core/testing (Angular)

**Build**: tsup (React), ng-packagr (Angular)

---

## 2. TDD Workflow — Non-Negotiable

```
RED → GREEN → REFACTOR
```

**Step 1 — RED**: Write types, then write tests. Run `npm test`. Tests MUST FAIL.
**Step 2 — GREEN**: Write the component. Run `npm test`. Tests MUST PASS.
**Step 3 — REFACTOR**: Clean up the code. Tests must still pass.

If you write the component before the test, you are not doing TDD.

### Test Coverage Requirements

Every component merge requires:
- All rendering tests passing
- All variant tests passing
- All prop tests passing
- All a11y tests passing (zero axe violations)
- Snapshot test passing

---

## 3. TypeScript Rules

### ❌ FORBIDDEN

```typescript
// @ts-nocheck          ← forbidden globally
const x: any = value;  ← never use any
function foo(x) { }    ← implicit any on params
```

### ✅ REQUIRED

```typescript
// Strict types everywhere
export type BadgeVariant = 'success' | 'error' | 'warning' | 'info';

interface BadgeProps {
  /** Visual style variant. Controls the colour scheme. @default 'info' */
  variant?: BadgeVariant;
}
```

### JSDoc on Every Prop

```typescript
// ❌ Wrong
dot?: boolean;

// ✅ Correct
/** Renders a small coloured dot indicator before the label text. @default false */
dot?: boolean;
```

### tsconfig.base.json (strict settings)

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

---

## 4. File & Folder Naming

```
React     → PascalCase folders + files
Angular   → kebab-case folders + files
Core      → kebab-case folders + files

packages/react/src/
  Badge/
    Badge.tsx               ← PascalCase
    Badge.types.ts          ← PascalCase + .types
    Badge.test.tsx          ← PascalCase + .test
    Badge.a11y.test.tsx     ← PascalCase + .a11y.test
    index.ts                ← always lowercase

packages/angular/src/
  badge/
    badge.component.ts      ← kebab-case + .component
    badge.component.spec.ts ← kebab-case + .component.spec
    index.ts

packages/core/src/components/
  badge/
    badge.css
    badge.js                ← only if has JS
    index.ts
```

**Test files live next to the component they test. Never in a `__tests__` folder.**

---

## 5. React Component Template

```tsx
// 1. 'use client' if uses hooks (required for Next.js App Router)
'use client';

// 2. External imports
import React from 'react';

// 3. Internal type imports
import type { BadgeProps } from './Badge.types';

// 4. Named export (NEVER default export)
export function Badge({
  variant  = 'info',
  size     = 'md',
  dot      = false,
  outline  = false,
  children,
  className,
  ...rest                   // always spread for aria-*, data-*, etc.
}: BadgeProps) {

  // 5. Effects with SSR guard + cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return;  // SSR GUARD — required
    const handler = () => { /* ... */ };
    element.addEventListener('click', handler);
    return () => element.removeEventListener('click', handler); // CLEANUP — required
  }, []);

  // 6. Compute classes as array
  const classes = [
    'mv-badge',
    `mv-badge--${variant}`,
    `mv-badge--${size}`,
    dot     ? 'mv-badge--dot'     : '',
    outline ? 'mv-badge--outline' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  // 7. Return JSX with spread
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

// ❌ NEVER: export default Badge;
```

### React Types Template

```typescript
// Badge.types.ts
import type { HTMLAttributes } from 'react';

// 1. Union types for constrained values
export type BadgeVariant = 'success' | 'error' | 'warning' | 'info';
export type BadgeSize    = 'sm' | 'md' | 'lg';

// 2. Props interface extends HTML attributes
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. Controls the colour scheme. @default 'info' */
  variant?: BadgeVariant;
  /** Size of the badge. @default 'md' */
  size?: BadgeSize;
  /** Renders a coloured dot indicator before the label. @default false */
  dot?: boolean;
  /** Transparent background with a coloured border. @default false */
  outline?: boolean;
}
```

### React Index Template

```typescript
// index.ts
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';
```

---

## 6. Angular Component Template

```typescript
// badge.component.ts
import {
  Component, Input, OnInit, OnDestroy,
  ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Co-located types
export type BadgeVariant = 'success' | 'error' | 'warning' | 'info';
export type BadgeSize    = 'sm' | 'md' | 'lg';

// 2. Component decorator
@Component({
  selector: 'mv-badge',          // mv- prefix, not mayvio-
  standalone: true,              // REQUIRED
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // REQUIRED
  host: { '[class]': 'hostClasses' },  // apply classes to host element
  template: `<ng-content></ng-content>`,
})
export class BadgeComponent implements OnChanges, OnDestroy {
  // 3. All @Input() with strict types, defaults, and JSDoc
  /** Visual style variant. Controls the colour scheme. @default 'info' */
  @Input() variant: BadgeVariant = 'info';

  /** Size of the badge. @default 'md' */
  @Input() size: BadgeSize = 'md';

  /** Renders a coloured dot indicator. @default false */
  @Input() dot: boolean = false;

  /** Transparent background with border. @default false */
  @Input() outline: boolean = false;

  // 4. Computed host classes
  hostClasses = '';

  // 5. Private cleanup storage
  private cleanupFns: Array<() => void> = [];

  ngOnChanges(_changes: SimpleChanges): void {
    this.hostClasses = [
      'mv-badge',
      `mv-badge--${this.variant}`,
      `mv-badge--${this.size}`,
      this.dot     ? 'mv-badge--dot'     : '',
      this.outline ? 'mv-badge--outline' : '',
    ].filter(Boolean).join(' ');
  }

  ngOnDestroy(): void {
    // 6. REQUIRED — clean up all subscriptions and event listeners
    this.cleanupFns.forEach(fn => fn());
  }
}
```

---

## 7. CSS Rules

### BEM Convention

```
.mv-{component}              → root element
.mv-{component}__{element}   → child element
.mv-{component}--{modifier}  → variant or state
```

```css
/* ✅ Correct */
.mv-badge { }
.mv-badge--success { }
.mv-alert__icon { }
.mv-alert__close { }
.mv-badge--dot { }

/* ❌ Wrong */
.badge { }             /* missing mv- prefix */
.badgeIcon { }         /* camelCase */
.badge-success { }     /* wrong BEM separator */
```

### Design Tokens — Required

```css
/* ✅ Use tokens */
.mv-badge {
  padding: var(--mv-space-1) var(--mv-space-3);
  border-radius: var(--mv-radius-full);
  font-size: var(--mv-text-xs);
  background: var(--mv-color-info-bg);
  color: var(--mv-color-info);
}

/* ❌ Hardcoded values */
.mv-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  background: #e0f2fe;
  color: #0284c7;
}
```

### Dark Mode (CSS only)

```css
:root {
  --mv-color-success: #22c55e;
  --mv-color-success-bg: color-mix(in srgb, #22c55e 15%, transparent);
}

[data-theme="dark"] {
  --mv-color-success: #4ade80;
  --mv-color-success-bg: color-mix(in srgb, #4ade80 12%, transparent);
}
```

---

## 8. Git & PR Rules

### Branch Names

```
feat/{component-name}      → new component
fix/{component}-{issue}    → bug fix
docs/{component}-page      → docs changes
refactor/{what-changed}    → refactoring
test/{component}-{type}    → test-only changes
```

### Commit Messages (Conventional Commits)

```
feat(badge): add standalone Angular component
fix(alert): remove memory leak in dismiss handler
docs(badge): add CodeSandbox integration to live demo
test(avatar): add a11y tests for all variants
refactor(core): rename CSS classes to BEM mv- convention
chore(ci): add test job to pull request workflow
```

### PR Checklist

```
[ ] Tests written BEFORE component code (TDD — verified via commit order)
[ ] npm test passes in all affected packages
[ ] Zero TypeScript errors (npm run build)
[ ] No `any` types
[ ] No `@ts-nocheck`
[ ] All @Input() / props have JSDoc comments
[ ] ngOnDestroy() present if Angular component attaches DOM listeners
[ ] return () => cleanup() present in all React effects with listeners
[ ] typeof window !== 'undefined' guard in DOM effects
[ ] Component in src/index.ts barrel export
[ ] Component in package.json exports map
[ ] Secondary Angular entry point created (if Angular component)
[ ] Docs page created with ≥3 live demos
[ ] StackBlitz button works on docs page
[ ] CodeSandbox button works on docs page
[ ] Changeset created (npx changeset)
```

---

## 9. Test Templates

### React Unit Test

```tsx
// Badge.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
    it('has base mv-badge class', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active')).toHaveClass('mv-badge');
    });
  });

  describe('Variants', () => {
    (['success', 'error', 'warning', 'info'] as const).forEach((v) => {
      it(`applies mv-badge--${v}`, () => {
        render(<Badge variant={v}>Label</Badge>);
        expect(screen.getByText('Label')).toHaveClass(`mv-badge--${v}`);
      });
    });
  });

  describe('HTML passthrough', () => {
    it('passes className', () => {
      render(<Badge className="custom">Label</Badge>);
      expect(screen.getByText('Label')).toHaveClass('custom');
    });
    it('passes aria-label', () => {
      render(<Badge aria-label="Status">Active</Badge>);
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
    });
  });
});
```

### React Accessibility Test

```tsx
// Badge.a11y.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge — Accessibility', () => {
  it('has no a11y violations', async () => {
    const { container } = render(<Badge>Active</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  (['success', 'error', 'warning', 'info'] as const).forEach((v) => {
    it(`has no a11y violations for variant="${v}"`, async () => {
      const { container } = render(<Badge variant={v}>Label</Badge>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
```

### Angular Unit Test

```typescript
// badge.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],   // standalone — import directly
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => expect(component).toBeTruthy());

  it('defaults to variant="info"', () => {
    expect(component.variant).toBe('info');
  });

  (['success', 'error', 'warning', 'info'] as const).forEach((v) => {
    it(`applies mv-badge--${v} for variant="${v}"`, () => {
      component.variant = v;
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.classList).toContain(`mv-badge--${v}`);
    });
  });

  it('applies mv-badge--dot when dot=true', () => {
    component.dot = true;
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).classList).toContain('mv-badge--dot');
  });
});
```

---

## 10. Tooling Stack

| Tool | Purpose | Config file |
|---|---|---|
| TypeScript | Language | `tsconfig.base.json` |
| Vitest | Unit testing (React) | `vitest.config.ts` |
| @testing-library/react | React component testing | — |
| jest-axe | Accessibility testing | — |
| @angular/core/testing | Angular unit testing | — |
| ESLint | Linting | `.eslintrc.json` |
| Prettier | Formatting | `.prettierrc` |
| Husky | Pre-commit hooks | `.husky/` |
| lint-staged | Run linters on staged files | `lint-staged` in `package.json` |
| tsup | React library bundler | `tsup.config.ts` |
| ng-packagr | Angular library bundler | `ng-package.json` |
| Changesets | Versioning + changelog | `.changeset/config.json` |
| Next.js 14 | Docs site | `next.config.ts` |
| @monaco-editor/react | Inline code editor | — |
