import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'mv-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mv-toast-container" [class]="containerClass()">
      <div
        *ngFor="let item of service.toasts()"
        [class]="'mv-toast mv-toast--' + item.type"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="mv-toast__content">
          <div *ngIf="item.title" class="mv-toast__title">{{ item.title }}</div>
          <div class="mv-toast__message">{{ item.message }}</div>
        </div>
        <button
          type="button"
          class="mv-toast__close"
          (click)="service.dismiss(item.id)"
          aria-label="Dismiss toast"
        >
          ✕
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  @Input() placement: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';

  readonly service = inject(ToastService);

  containerClass(): string {
    return `mv-toast-container--${this.placement}`;
  }
}
