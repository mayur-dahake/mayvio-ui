import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'mayvio-accordion',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-accordion" [ngClass]="className">
      <div *ngFor="let item of items; let i = index" class="mv-accordion__item">
        <h3 class="mv-accordion__header">
          <button
            type="button"
            [id]="'accordion-header-' + item.id"
            class="mv-accordion__trigger"
            [attr.aria-expanded]="isExpanded(item.id)"
            [attr.aria-controls]="'accordion-content-' + item.id"
            [disabled]="item.disabled"
            (click)="toggleItem(item.id)"
          >
            {{ item.title }}
            <svg
              class="mv-accordion__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </h3>
        <div
          [id]="'accordion-content-' + item.id"
          role="region"
          [attr.aria-labelledby]="'accordion-header-' + item.id"
          class="mv-accordion__content"
          [hidden]="!isExpanded(item.id)"
        >
          <div class="mv-accordion__content-inner">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccordionComponent {
  private cdr = inject(ChangeDetectorRef);

  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple = false;
  @Input() className = '';

  private internalExpandedIds = signal<string[]>([]);
  private _expandedIds?: string[];

  @Input()
  set expandedIds(val: string[] | undefined) {
    this._expandedIds = val;
    this.cdr.markForCheck();
  }

  get expandedIds(): string[] | undefined {
    return this._expandedIds;
  }

  @Input()
  set defaultExpandedIds(val: string[]) {
    this.internalExpandedIds.set([...val]);
  }

  @Output() expandedChange = new EventEmitter<string[]>();

  get currentExpandedIds(): string[] {
    return this._expandedIds !== undefined ? this._expandedIds : this.internalExpandedIds();
  }

  isExpanded(id: string): boolean {
    return this.currentExpandedIds.includes(id);
  }

  toggleItem(id: string): void {
    const item = this.items.find((i) => i.id === id);
    if (item?.disabled) return;

    let nextExpandedIds: string[];
    const isExpanded = this.isExpanded(id);

    if (this.allowMultiple) {
      if (isExpanded) {
        nextExpandedIds = this.currentExpandedIds.filter((item) => item !== id);
      } else {
        nextExpandedIds = [...this.currentExpandedIds, id];
      }
    } else {
      if (isExpanded) {
        nextExpandedIds = [];
      } else {
        nextExpandedIds = [id];
      }
    }

    if (this._expandedIds === undefined) {
      this.internalExpandedIds.set(nextExpandedIds);
    }

    this.expandedChange.emit(nextExpandedIds);
    this.cdr.markForCheck();
  }
}
