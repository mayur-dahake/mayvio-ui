// @ts-nocheck
import { Component, Input, OnInit } from "@angular/core";

export interface DataGridColumn {
  key: string;
  label: string;
  type: "number" | "string" | "date";
  sortable: boolean;
}

/**
 * Angular Component Wrapper for Mayvio UI Data Grid.
 * Usage: `<mayvio-data-grid [initialData]="employees" [columns]="gridColumns"></mayvio-data-grid>`
 */
@Component({
  selector: "mayvio-data-grid",
  template: `
    <div class="data-grid-container">
      <!-- Toolbar -->
      <div class="data-grid-toolbar">
        <div class="data-grid-search">
          <input
            type="text"
            placeholder="Search rows..."
            aria-label="Search rows"
            [(ngModel)]="searchQuery"
            (input)="onSearchChange()"
          />
        </div>
        <div class="data-grid-actions">
          <div class="dg-dropdown" [class.open]="isColMenuOpen">
            <button
              type="button"
              class="control-btn dg-dropdown-trigger"
              aria-haspopup="listbox"
              [attr.aria-expanded]="isColMenuOpen"
              (click)="toggleColMenu($event)"
            >
              <span class="dg-dropdown-label">Columns</span>
              <span class="dg-dropdown-arrow">▼</span>
            </button>
            <div *ngIf="isColMenuOpen" class="dg-dropdown-menu" role="listbox" aria-label="Toggle Columns">
              <label *ngFor="let col of columns" class="dg-dropdown-item">
                <input
                  type="checkbox"
                  [checked]="isColumnVisible(col.key)"
                  (change)="toggleColumnVisibility(col.key)"
                />
                <span>{{ col.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Viewport -->
      <div class="data-grid-wrapper" role="region" aria-label="Data Grid" tabindex="0">
        <table class="data-grid" role="grid">
          <thead>
            <tr role="row">
              <ng-container *ngFor="let col of columns">
                <th
                  *ngIf="isColumnVisible(col.key)"
                  scope="col"
                  [class.sortable]="col.sortable"
                  [attr.aria-sort]="getSortAttr(col)"
                  [attr.tabindex]="col.sortable ? 0 : -1"
                  (click)="col.sortable && handleSort(col.key)"
                  (keydown.enter)="col.sortable && handleSort(col.key)"
                  (keydown.space)="$event.preventDefault(); col.sortable && handleSort(col.key)"
                >
                  {{ col.label }}
                  <span *ngIf="col.sortable" class="data-grid-sort-icon" aria-hidden="true">
                    {{ getSortIcon(col.key) }}
                  </span>
                </th>
              </ng-container>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of paginatedData" role="row">
              <ng-container *ngFor="let col of columns">
                <td *ngIf="isColumnVisible(col.key)">
                  <ng-container *ngIf="col.key === 'status'; else standardCell">
                    <span class="dg-badge {{ row[col.key] | lowercase }}">{{ row[col.key] }}</span>
                  </ng-container>
                  <ng-template #standardCell>{{ row[col.key] }}</ng-template>
                </td>
              </ng-container>
            </tr>
            <tr *ngIf="filteredData.length === 0">
              <td
                [attr.colspan]="getVisibleColumnsCount()"
                style="text-align: center; color: var(--text-muted); padding: 32px 16px;"
              >
                No records match the active filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination footer -->
      <div class="data-grid-pagination">
        <div class="dg-page-size">
          <label for="dgPageSizeAngular">Rows per page:</label>
          <select
            id="dgPageSizeAngular"
            [ngModel]="pageSize"
            (ngModelChange)="onPageSizeChange($event)"
          >
            <option [value]="5">5</option>
            <option [value]="10">10</option>
            <option [value]="15">15</option>
          </select>
        </div>
        <div class="dg-pagination-info" aria-live="polite">
          Showing {{ startRecord }}-{{ endRecord }} of {{ totalRecords }}
        </div>
        <div class="dg-pagination-controls">
          <button
            type="button"
            class="control-btn dg-pag-btn"
            [disabled]="currentPage === 1"
            (click)="goToPage(1)"
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            class="control-btn dg-pag-btn"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)"
            aria-label="Previous page"
          >
            ‹
          </button>
          <div class="dg-page-numbers">
            <button
              *ngFor="let page of pageNumbers"
              type="button"
              class="dg-page-num"
              [class.active]="page === currentPage"
              [attr.aria-label]="'Page ' + page"
              [attr.aria-current]="page === currentPage ? 'page' : null"
              (click)="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            type="button"
            class="control-btn dg-pag-btn"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)"
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            class="control-btn dg-pag-btn"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(totalPages)"
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DataGridComponent implements OnInit {
  @Input() initialData: any[] = [];
  @Input() columns: DataGridColumn[] = [];

  searchQuery = "";
  currentPage = 1;
  pageSize = 10;
  sortCol: string | null = null;
  sortDir: "asc" | "desc" = "asc";
  visibleCols: string[] = [];
  isColMenuOpen = false;

  filteredData: any[] = [];
  paginatedData: any[] = [];
  totalPages = 1;
  startRecord = 0;
  endRecord = 0;
  totalRecords = 0;
  pageNumbers: number[] = [];

  ngOnInit() {
    this.visibleCols = this.columns.map((c) => c.key);
    this.updateGrid();
    
    // Add close listener for columns dropdown
    document.addEventListener("click", this.onOutsideClick.bind(this));
  }

  onOutsideClick(event: Event) {
    if (this.isColMenuOpen) {
      const dropdown = document.querySelector(".dg-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        this.isColMenuOpen = false;
      }
    }
  }

  toggleColMenu(event: Event) {
    event.stopPropagation();
    this.isColMenuOpen = !this.isColMenuOpen;
  }

  isColumnVisible(key: string): boolean {
    return this.visibleCols.includes(key);
  }

  toggleColumnVisibility(key: string) {
    if (this.visibleCols.includes(key)) {
      this.visibleCols = this.visibleCols.filter((k) => k !== key);
    } else {
      this.visibleCols = [...this.visibleCols, key];
    }
  }

  getVisibleColumnsCount(): number {
    return this.visibleCols.length;
  }

  getSortAttr(col: DataGridColumn): string {
    if (this.sortCol !== col.key) return "none";
    return this.sortDir === "asc" ? "ascending" : "descending";
  }

  getSortIcon(key: string): string {
    if (this.sortCol !== key) return "⇅";
    return this.sortDir === "asc" ? "▲" : "▼";
  }

  handleSort(key: string) {
    if (this.sortCol === key) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      this.sortCol = key;
      this.sortDir = "asc";
    }
    this.currentPage = 1;
    this.updateGrid();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updateGrid();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.updateGrid();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updateGrid() {
    // 1. Search Query Filter
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      this.filteredData = this.initialData.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(q))
      );
    } else {
      this.filteredData = [...this.initialData];
    }

    // 2. Sorting
    if (this.sortCol) {
      const colDef = this.columns.find((c) => c.key === this.sortCol);
      const isAsc = this.sortDir === "asc";
      const factor = isAsc ? 1 : -1;

      this.filteredData.sort((a, b) => {
        const valA = a[this.sortCol!];
        const valB = b[this.sortCol!];

        if (colDef?.type === "number") {
          return (valA - valB) * factor;
        } else if (colDef?.type === "date") {
          return (new Date(valA).getTime() - new Date(valB).getTime()) * factor;
        } else {
          return String(valA).localeCompare(String(valB)) * factor;
        }
      });
    }

    this.updatePagination();
  }

  updatePagination() {
    this.totalRecords = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize) || 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.startRecord = this.totalRecords === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    this.endRecord = Math.min(this.currentPage * this.pageSize, this.totalRecords);

    const startIdx = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(startIdx, startIdx + this.pageSize);

    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
