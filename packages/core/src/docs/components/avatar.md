# Avatar

The **Avatar** component renders circular profile photos, fallback initial cards, and stacked overlapping group structures.

---

## 📂 File Requirements
* **CSS:** [avatar.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/avatar.css)
* **JS:** Pure CSS layouts. No JavaScript required.

---

## 🧱 HTML Template
```html
<!-- Single Image -->
<span class="avatar md">
  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User profile">
</span>

<!-- Fallback Initials -->
<span class="avatar md">MD</span>

<!-- Avatar Group Stack -->
<div class="avatar-group">
  <span class="avatar sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" alt=""></span>
  <span class="avatar sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" alt=""></span>
  <span class="avatar sm more">+4</span>
</div>
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--avatar-border` | `var(--card)` | Separation border color (used for group overlays). |
| `--avatar-bg` | `var(--bg-secondary)`| Fallback initials card background. |

---

## 🔌 Framework Quick Start
* **React:** Map a list of image URLs to nested items inside an avatar stack component.
* **Angular:** Render image fallback templates using standard condition checks (`*ngIf="src; else initialsTemplate"`).
