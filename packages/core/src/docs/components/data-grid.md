# Data Grid

The **Data Grid** component provides an enterprise-ready data table supporting client-side searching, sorting, pagination, and columns visibility toggling.

---

## 📂 File Requirements
* **CSS:** [data-grid.css](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/styles/components/data-grid.css)
* **JS:** [data-grid.js](file:///Volumes/SSD/Projects/UI%20Projects/ui-component-lab/scripts/components/data-grid.js)

---

## 🧱 HTML Template
```html
<div class="data-grid-container">
  <!-- Toolbar: Search and Columns Dropdown -->
  <div class="data-grid-toolbar">
    <div class="data-grid-search">
      <input type="text" id="dgSearch" placeholder="Search rows..." aria-label="Search rows">
    </div>
    <div class="data-grid-actions">
      <div class="dg-dropdown" id="dgColDropdown">
        <button class="control-btn dg-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false" id="dgColBtn">
          <span class="dg-dropdown-label">Columns</span>
          <span class="dg-dropdown-arrow">▼</span>
        </button>
        <div class="dg-dropdown-menu" role="listbox" aria-label="Toggle Columns">
          <!-- Populated dynamically with checklist items -->
        </div>
      </div>
    </div>
  </div>

  <!-- Table Viewport -->
  <div class="data-grid-wrapper" role="region" aria-label="Data Grid" tabindex="0">
    <table class="data-grid" id="dgTable" role="grid">
      <thead>
        <tr role="row">
          <!-- Col headers with aria-sort and sort icon indicators -->
        </tr>
      </thead>
      <tbody>
        <!-- Data cells -->
      </tbody>
    </table>
  </div>

  <!-- Pagination controls -->
  <div class="data-grid-pagination">
    <div class="dg-page-size">
      <label for="dgPageSize">Rows per page:</label>
      <select id="dgPageSize" aria-label="Rows per page">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="15">15</option>
      </select>
    </div>
    <div class="dg-pagination-info" id="dgPaginationInfo" aria-live="polite"></div>
    <div class="dg-pagination-controls">
      <button class="control-btn dg-pag-btn" id="dgFirstPage" aria-label="First page">«</button>
      <button class="control-btn dg-pag-btn" id="dgPrevPage" aria-label="Previous page">‹</button>
      <div class="dg-page-numbers" id="dgPageNumbers"></div>
      <button class="control-btn dg-pag-btn" id="dgNextPage" aria-label="Next page">›</button>
      <button class="control-btn dg-pag-btn" id="dgLastPage" aria-label="Last page">»</button>
    </div>
  </div>
</div>
```

---

## ⚙️ JavaScript Initialization
```javascript
import { initDataGrid } from "./components/data-grid.js";

// Binds sorting header clicks, search query typing, pagination page sizes, and columns visibility toggles
initDataGrid();
```

---

## 🎨 CSS Customization Variables

| CSS Variable | Default Value | Description |
|--------------|---------------|-------------|
| `--dg-row-hover` | `color-mix(in srgb, var(--primary) 4%, transparent)` | Row background color on hover. |
| `--dg-header-hover` | `color-mix(in srgb, var(--primary) 8%, var(--bg-secondary))` | Column headers background color on hover. |
| `--dg-selected-bg` | `color-mix(in srgb, var(--primary) 12%, transparent)` | Selection state background color. |

---

## 🔌 Framework Quick Start

### React
Import the state-driven wrapper component:
```jsx
import { DataGridWrapper } from "./examples/react-integration/DataGridWrapper";

<DataGridWrapper initialData={myData} columns={myCols} />
```

### Angular
Import and declare the directive template wrapper:
```html
<mayvio-data-grid [initialData]="myData" [columns]="myCols"></mayvio-data-grid>
```
