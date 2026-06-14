import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mv-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="classes">
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() variant: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dot = false;
  @Input() outline = false;

  get classes() {
    return {
      'mv-badge': true,
      [`mv-badge--${this.variant}`]: true,
      [`mv-badge--${this.size}`]: true,
      'mv-badge--dot': this.dot,
      'mv-badge--outline': this.outline,
    };
  }
}
