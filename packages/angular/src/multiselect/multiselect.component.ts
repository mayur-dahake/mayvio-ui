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
import 'mayvio-ui/multiselect/css';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'mv-multiselect',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-multiselect" [class.mv-multiselect--open]="isOpen" [class]="className">
      <div
        class="mv-multiselect-trigger"
        [class.mv-multiselect-trigger--disabled]="disabled"
        (click)="toggleMenu()"
        [attr.tabindex]="disabled ? -1 : 0"
        (keydown.enter)="toggleMenu()"
        (keydown.space)="toggleMenu(); $event.preventDefault()"
      >
        <ng-container *ngIf="selectedOptions.length === 0">
          <span class="mv-multiselect-placeholder">{{ placeholder }}</span>
        </ng-container>

        <ng-container *ngIf="selectedOptions.length > 0">
          <span
            *ngFor="let opt of selectedOptions"
            class="mv-badge mv-badge--md mv-badge--default"
            style="gap: 0.25rem"
          >
            {{ opt.label }}
            <button
              type="button"
              [attr.aria-label]="'Remove ' + opt.label"
              (click)="removeTag($event, opt.value)"
              style="background: none; border: none; cursor: pointer; padding: 0; display: flex"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </span>
        </ng-container>
      </div>

      <div class="mv-multiselect-menu" role="listbox" *ngIf="isOpen">
        <div class="mv-multiselect-search" *ngIf="searchable" (click)="$event.stopPropagation()">
          <input
            type="text"
            class="mv-multiselect-search-input"
            placeholder="Search..."
            [value]="searchQuery"
            (input)="onSearch($event)"
          />
        </div>

        <div class="mv-multiselect-empty" *ngIf="filteredOptions.length === 0">
          {{ emptyText }}
        </div>

        <div
          *ngFor="let opt of filteredOptions"
          class="mv-multiselect-option"
          [class.mv-multiselect-option--selected]="isSelected(opt.value)"
          [class.mv-multiselect-option--disabled]="opt.disabled"
          role="option"
          [attr.aria-selected]="isSelected(opt.value)"
          (click)="onOptionClick($event, opt)"
        >
          <svg
            [style.visibility]="isSelected(opt.value) ? 'visible' : 'hidden'"
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
          {{ opt.label }}
        </div>
      </div>
    </div>
  `,
})
export class MultiSelectComponent {
  @Input() options: MultiSelectOption[] = [];
  @Input() value: (string | number)[] = [];
  @Input() disabled = false;
  @Input() searchable = false;
  @Input() placeholder = 'Select options...';
  @Input() emptyText = 'No options found.';
  @Input() className = '';

  @Output() selectionChange = new EventEmitter<(string | number)[]>();

  isOpen = false;
  searchQuery = '';

  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  get selectedOptions(): MultiSelectOption[] {
    return this.options.filter((opt) => this.value.includes(opt.value));
  }

  get filteredOptions(): MultiSelectOption[] {
    if (!this.searchable || !this.searchQuery) {
      return this.options;
    }
    const q = this.searchQuery.toLowerCase();
    return this.options.filter((opt) => opt.label.toLowerCase().includes(q));
  }

  isSelected(val: string | number): boolean {
    return this.value.includes(val);
  }

  toggleMenu() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.searchQuery = '';
    }
    this.cdr.markForCheck();
  }

  toggleOption(val: string | number) {
    const newVal = this.value.includes(val)
      ? this.value.filter((v) => v !== val)
      : [...this.value, val];

    this.value = newVal;
    this.selectionChange.emit(this.value);
    this.cdr.markForCheck();
  }

  onOptionClick(event: Event, opt: MultiSelectOption) {
    event.stopPropagation();
    if (!opt.disabled) {
      this.toggleOption(opt.value);
    }
  }

  removeTag(event: Event, val: string | number) {
    event.stopPropagation();
    this.toggleOption(val);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.cdr.markForCheck();
  }

  @HostListener('document:mousedown', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (this.isOpen && !this.el.nativeElement.contains(target)) {
      this.isOpen = false;
      this.searchQuery = '';
      this.cdr.markForCheck();
    }
  }
}
