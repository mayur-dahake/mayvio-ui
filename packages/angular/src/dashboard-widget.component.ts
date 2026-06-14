// @ts-nocheck
import { Component, Input, OnInit, ElementRef } from "@angular/core";
import { initDashboardWidgets } from "mayvio-ui/scripts/components/dashboard-widget.js";

/**
 * DashboardWidgetComponent
 * Individual card panel inside the grid.
 */
@Component({
  selector: "mayvio-dashboard-widget",
  template: `
    <div *ngIf="visible" [id]="id" class="widget" [class.collapsed]="collapsed">
      <div class="widget-header">
        <div class="widget-header-left">
          <span class="widget-drag-handle" title="Drag to rearrange">☰</span>
          <h3 class="widget-title">{{ title }}</h3>
        </div>
        <div class="widget-actions">
          <button
            class="widget-btn widget-btn-collapse"
            (click)="toggleCollapse($event)"
            [attr.aria-expanded]="!collapsed"
            aria-label="Collapse widget"
            type="button"
          >
            ▼
          </button>
          <button
            *ngIf="dismissible"
            class="widget-btn widget-btn-close"
            (click)="close($event)"
            aria-label="Close widget"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>
      <div class="widget-content">
        <div class="widget-content-inner">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class DashboardWidgetComponent {
  @Input() id = "";
  @Input() title = "";
  @Input() collapsed = false;
  @Input() dismissible = true;

  visible = true;

  toggleCollapse(e: MouseEvent) {
    e.stopPropagation();
    this.collapsed = !this.collapsed;
  }

  close(e: MouseEvent) {
    e.stopPropagation();
    this.visible = false;
  }
}

/**
 * DashboardWidgetGridComponent
 * Parent container triggering Drag & Drop orchestration.
 */
@Component({
  selector: "mayvio-dashboard-widget-grid",
  template: `
    <div class="widget-grid {{ className }}">
      <ng-content></ng-content>
    </div>
  `
})
export class DashboardWidgetGridComponent implements OnInit {
  @Input() storageKey = "mayvio-widget-order";
  @Input() className = "";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const grid = this.el.nativeElement.querySelector(".widget-grid");
    if (grid) {
      setTimeout(() => {
        initDashboardWidgets(grid, { storageKey: this.storageKey });
      }, 0);
    }
  }
}
