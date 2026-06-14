# Mayvio UI — Migration Guide (v3.x → v4.0.0)

> v4.0.0 is a major version with breaking changes.
> This guide covers every change and the steps to upgrade.

---

## Breaking Changes Summary

| Category | Old (v3.x) | New (v4.0.0) |
|---|---|---|
| CSS class prefix | `.badge` | `.mv-badge` |
| CSS modifier style | `.badge.success` | `.mv-badge--success` |
| CSS element style | `.alert-icon` | `.mv-alert__icon` |
| CSS token prefix | `--bg` | `--mv-color-bg` |
| CSS token prefix | `--success` | `--mv-color-success` |
| Angular selector | `<mayvio-badge>` | `<mv-badge>` |
| Angular module | Required | Optional (standalone preferred) |
| Component import | `import { Badge } from '@mayvio-ui/react'` only | Also supports `@mayvio-ui/react/Badge` |

---

## Step 1 — Update Packages

```bash
npm install mayvio-ui@^4.0.0
npm install @mayvio-ui/react@^2.0.0    # if using React
npm install @mayvio-ui/angular@^2.0.0  # if using Angular
```

---

## Step 2 — CSS Class Rename

### Search and Replace

Run these find-and-replace operations across your entire codebase:

| Find | Replace |
|---|---|
| `class="badge` | `class="mv-badge` |
| `class="badge success"` | `class="mv-badge mv-badge--success"` |
| `class="badge error"` | `class="mv-badge mv-badge--error"` |
| `class="badge warning"` | `class="mv-badge mv-badge--warning"` |
| `class="badge info"` | `class="mv-badge mv-badge--info"` |
| `class="badge outline"` | `class="mv-badge mv-badge--outline"` |
| `class="badge dot"` | `class="mv-badge mv-badge--dot"` |
| `class="alert` | `class="mv-alert` |
| `class="alert success"` | `class="mv-alert mv-alert--success"` |
| `alert-icon` | `mv-alert__icon` |
| `alert-title` | `mv-alert__title` |
| `alert-message` | `mv-alert__message` |
| `alert-close` | `mv-alert__close` |
| `class="avatar` | `class="mv-avatar` |
| `class="avatar-group` | `class="mv-avatar-group` |

**Using sed (macOS/Linux):**

```bash
# Dry run first — see what would change
grep -rn "class=\"badge" src/

# Replace (dangerous — always commit before running)
find src/ -name "*.html" -exec sed -i '' 's/class="badge/class="mv-badge/g' {} +
```

---

## Step 3 — CSS Token Rename

If you customised any Mayvio design tokens in your app:

| Old Token | New Token |
|---|---|
| `--bg` | `--mv-color-bg` |
| `--bg-secondary` | `--mv-color-bg-secondary` |
| `--card` | `--mv-color-surface` |
| `--text` | `--mv-color-text` |
| `--text-muted` | `--mv-color-text-muted` |
| `--border` | `--mv-color-border` |
| `--primary` | `--mv-color-primary` |
| `--success` | `--mv-color-success` |
| `--error` | `--mv-color-error` |
| `--warning` | `--mv-color-warning` |
| `--info` | `--mv-color-info` |
| `--radius-sm` | `--mv-radius-sm` |
| `--radius-md` | `--mv-radius-md` |
| `--radius-full` | `--mv-radius-full` |

---

## Step 4 — Angular Selector Rename

Old:
```html
<mayvio-badge variant="success">Active</mayvio-badge>
<mayvio-alert variant="info" [dismissible]="true">Message</mayvio-alert>
```

New:
```html
<mv-badge variant="success">Active</mv-badge>
<mv-alert variant="info" [dismissible]="true">Message</mv-alert>
```

---

## Step 5 — Angular Module (Optional Migration)

The `MayvioUIModule` still works in v4. No change required if you use it.

However, you can now use individual standalone imports:

**Before (v3.x — still works):**
```typescript
@NgModule({
  imports: [MayvioUIModule]
})
```

**After (v4 — recommended):**
```typescript
@Component({
  standalone: true,
  imports: [BadgeComponent, AlertComponent]  // import only what you use
})
```

---

## Step 6 — CSS Import Path

**Before:**
```css
@import 'mayvio-ui/css';
```

**After:**
```css
@import 'mayvio-ui/css'; /* still works — imports all tokens */

/* Or import per-component CSS: */
@import 'mayvio-ui/badge/css';
@import 'mayvio-ui/alert/css';
```

---

## Dark Mode Migration

**Before (v3.x):**
```javascript
document.body.classList.add('dark');
```

**After (v4):**
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
// OR
document.body.setAttribute('data-theme', 'dark');
```

The dark mode trigger changed from `body.dark` (class) to `[data-theme="dark"]` (attribute).
This is more standard and avoids class name collisions.
