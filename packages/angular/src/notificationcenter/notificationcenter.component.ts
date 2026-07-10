import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemConfig } from 'mayvio-ui/notificationcenter';
import 'mayvio-ui/notificationcenter/css';

@Component({
  selector: 'mv-notification-center',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mv-notification"
      [class.mv-notification--open]="isOpen"
      [class]="className"
      style="position: relative; display: inline-block"
    >
      <button
        type="button"
        class="mv-notification-trigger"
        (click)="toggleOpen()"
        aria-label="Notifications"
        [attr.aria-expanded]="isOpen"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span class="mv-notification-badge" *ngIf="unreadCount > 0">{{ unreadCount }}</span>
      </button>

      <div class="mv-notification-popup" role="dialog" [attr.aria-label]="title" *ngIf="isOpen">
        <div class="mv-notification-header">
          <h3 class="mv-notification-title">{{ title }}</h3>
          <button
            type="button"
            class="mv-notification-mark-all"
            *ngIf="unreadCount > 0"
            (click)="markAllAsRead.emit()"
          >
            {{ markAllText }}
          </button>
        </div>
        <div class="mv-notification-list">
          <div class="mv-notification-empty" *ngIf="notifications.length === 0">
            {{ emptyText }}
          </div>

          <div
            *ngFor="let n of notifications; let i = index"
            class="mv-notification-item"
            [class.mv-notification-item--unread]="n.unread"
          >
            <div
              class="mv-notification-item-icon"
              [ngClass]="'mv-notification-item-icon--' + (n.status || 'info')"
            >
              <ng-container [ngSwitch]="n.status">
                <svg
                  *ngSwitchCase="'success'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <svg
                  *ngSwitchCase="'warning'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  ></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <svg
                  *ngSwitchCase="'error'"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <svg
                  *ngSwitchDefault
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </ng-container>
            </div>
            <div class="mv-notification-item-content">
              <div class="mv-notification-item-title">{{ n.title }}</div>
              <div class="mv-notification-item-desc" *ngIf="n.description">{{ n.description }}</div>
              <div class="mv-notification-item-time" *ngIf="n.time">{{ n.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NotificationCenterComponent {
  @Input() title = 'Notifications';
  @Input() notifications: NotificationItemConfig[] = [];
  @Input() markAllText = 'Mark all as read';
  @Input() emptyText = 'No notifications';
  @Input() className = '';

  @Output() markAllAsRead = new EventEmitter<void>();

  isOpen = false;

  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  get unreadCount(): number {
    return this.notifications.filter((n) => n.unread).length;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
  }

  @HostListener('document:mousedown', ['$event.target'])
  onClickOutside(target: EventTarget | null) {
    if (this.isOpen && !this.el.nativeElement.contains(target as Node)) {
      this.isOpen = false;
      this.cdr.markForCheck();
    }
  }
}
