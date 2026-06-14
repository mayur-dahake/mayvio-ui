import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'mv-alert',
  standalone: true,
  imports: [NgIf],
  template: `
    <div *ngIf="visible()" [class]="hostClass()" role="alert">
      <span class="mv-alert__icon" aria-hidden="true">{{ icon() }}</span>
      <div class="mv-alert__content">
        <div *ngIf="title" class="mv-alert__title">{{ title }}</div>
        <div class="mv-alert__message">
          <ng-content></ng-content>
        </div>
      </div>
      <button
        *ngIf="dismissible"
        class="mv-alert__close"
        aria-label="Dismiss alert"
        (click)="dismiss()"
      >
        ✕
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() variant: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() title = '';
  @Input() dismissible = false;
  @Output() dismissed = new EventEmitter<void>();

  readonly visible = signal(true);
  readonly dismissing = signal(false);

  readonly hostClass = computed(() => {
    const classes = ['mv-alert', `mv-alert--${this.variant}`];
    if (this.dismissing()) classes.push('mv-alert--dismissing');
    return classes.join(' ');
  });

  readonly icon = computed(() => {
    const icons: Record<string, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[this.variant] ?? 'ℹ';
  });

  dismiss(): void {
    this.dismissing.set(true);
    setTimeout(() => {
      this.visible.set(false);
      this.dismissed.emit();
    }, 250);
  }
}
