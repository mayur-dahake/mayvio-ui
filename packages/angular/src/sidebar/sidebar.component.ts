import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLinkConfig } from 'mayvio-ui/sidebar';
import 'mayvio-ui/sidebar/css';

@Component({
  selector: 'mv-sidebar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mv-sidebar-overlay"
      [class.mv-sidebar-overlay--mobile-open]="mobileOpen"
      (click)="closeMobile()"
      aria-hidden="true"
    ></div>

    <aside
      class="mv-sidebar"
      [class.mv-sidebar--collapsed]="collapsed"
      [class.mv-sidebar--mobile-open]="mobileOpen"
      [class]="className"
    >
      <div class="mv-sidebar-header">
        <div class="mv-sidebar-logo">{{ title }}</div>
        <button
          type="button"
          class="mv-sidebar-toggle"
          (click)="toggleCollapse()"
          [attr.aria-label]="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </div>

      <div class="mv-sidebar-content">
        <ul class="mv-sidebar-nav">
          <li *ngFor="let link of links" class="mv-sidebar-item">
            <a
              [href]="link.href || '#'"
              class="mv-sidebar-link"
              [class.mv-sidebar-link--active]="link.active"
              (click)="onLinkClick($event, link)"
            >
              <div class="mv-sidebar-icon">
                <!-- Default placeholder icon -->
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                  ></path>
                </svg>
              </div>
              <span class="mv-sidebar-label">{{ link.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  @Input() title = 'Mayvio UI';
  @Input() links: SidebarLinkConfig[] = [];
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Input() className = '';

  @Output() linkSelect = new EventEmitter<SidebarLinkConfig>();
  @Output() toggleCollapseEvent = new EventEmitter<boolean>();
  @Output() mobileCloseEvent = new EventEmitter<void>();

  toggleCollapse() {
    this.toggleCollapseEvent.emit(!this.collapsed);
  }

  closeMobile() {
    this.mobileCloseEvent.emit();
  }

  onLinkClick(e: Event, link: SidebarLinkConfig) {
    if (!link.href) {
      e.preventDefault();
    }
    this.linkSelect.emit(link);
    if (this.mobileOpen) {
      this.closeMobile();
    }
  }
}
