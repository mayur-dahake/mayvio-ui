import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

@Component({
  selector: 'mv-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="mv-breadcrumb" aria-label="Breadcrumb">
      <ol class="mv-breadcrumb__list">
        <li
          *ngFor="let item of _items(); let i = index; let last = last"
          class="mv-breadcrumb__item"
          [class.mv-breadcrumb__item--active]="item.active || last"
          [attr.aria-current]="item.active || last ? 'page' : null"
        >
          <ng-container *ngIf="item.href && !(item.active || last); else textOnly">
            <a [href]="item.href" class="mv-breadcrumb__link">{{ item.label }}</a>
          </ng-container>
          <ng-template #textOnly>
            <span class="mv-breadcrumb__link">{{ item.label }}</span>
          </ng-template>

          <span *ngIf="!last" class="mv-breadcrumb__separator" aria-hidden="true">
            {{ _separator() }}
          </span>
        </li>
      </ol>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnChanges {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: string = '/';

  readonly _items = signal<BreadcrumbItem[]>([]);
  readonly _separator = signal<string>('/');

  ngOnChanges(): void {
    this._items.set(this.items || []);
    this._separator.set(this.separator);
  }
}
