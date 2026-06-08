// @ts-nocheck
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit
} from "@angular/core";

export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Angular Component Wrapper for Mayvio UI Dropdown.
 * Supports single and multi-select modes, search, and full keyboard navigation.
 */
@Component({
  selector: "mayvio-dropdown",
  template: `
    <div class="dropdown" [class.open]="isOpen">
      <button
        type="button"
        class="dropdown-trigger"
        aria-haspopup="listbox"
        [attr.aria-expanded]="isOpen"
        (click)="toggleOpen($event)"
      >
        <span class="dropdown-label" [class.placeholder]="isPlaceholderActive()">
          {{ getTriggerLabel() }}
        </span>
        <span class="dropdown-chevron" aria-hidden="true">▼</span>
      </button>

      <div *ngIf="isOpen" class="dropdown-menu" role="listbox" [attr.aria-multiselectable]="isMulti">
        <div class="dropdown-search" (click)="$event.stopPropagation()">
          <input
            #searchInput
            type="text"
            placeholder="Search..."
            aria-label="Search options"
            [value]="searchQuery"
            (input)="onSearchInput($any($event.target).value)"
            (keydown)="handleKeyDown($event)"
          />
        </div>
        <ul class="dropdown-options">
          <ng-container *ngIf="getVisibleOptions().length > 0; else noOptions">
            <li
              *ngFor="let opt of getVisibleOptions(); let idx = index"
              className="dropdown-option"
              [class.selected]="isSelected(opt)"
              [class.focused]="idx === focusedIndex"
              role="option"
              [attr.aria-selected]="isSelected(opt)"
              (click)="selectOption(opt, $event)"
            >
              <span class="check">✓</span>
              {{ opt.label }}
            </li>
          </ng-container>
          <ng-template #noOptions>
            <li class="dropdown-option disabled" style="color: var(--text-muted); pointer-events: none;">
              No options found
            </li>
          </ng-template>
        </ul>
      </div>

      <div *ngIf="isMulti && getSelectedOptions().length > 0" class="dropdown-chips">
        <span *ngFor="let s of getSelectedOptions()" class="dropdown-chip">
          {{ s.label }}
          <button type="button" [attr.aria-label]="'Remove ' + s.label" (click)="removeChip(s, $event)">✕</button>
        </span>
      </div>
    </div>
  `
})
export class DropdownComponent implements OnInit {
  @Input() options: DropdownOption[] = [];
  @Input() isMulti: boolean = false;
  @Input() placeholder: string = "Select option...";
  @Input() value: string | string[] = "";

  @Output() valueChange = new EventEmitter<string | string[]>();

  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>;

  isOpen = false;
  searchQuery = "";
  focusedIndex = -1;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.isMulti && !Array.isArray(this.value)) {
      this.value = [];
    }
  }

  // Close dropdown if clicking outside the component
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  toggleOpen(event: MouseEvent) {
    event.stopPropagation();
    if (this.isOpen) {
      this.close();
    } else {
      this.isOpen = true;
      this.searchQuery = "";
      this.focusedIndex = -1;
      // Focus the search box on next tick
      setTimeout(() => this.searchInput?.nativeElement.focus(), 0);
    }
  }

  close() {
    this.isOpen = false;
    this.searchQuery = "";
    this.focusedIndex = -1;
  }

  onSearchInput(query: string) {
    this.searchQuery = query;
    this.focusedIndex = -1; // reset selection focus
  }

  getVisibleOptions(): DropdownOption[] {
    const query = this.searchQuery.toLowerCase();
    return this.options.filter((opt) => opt.label.toLowerCase().includes(query));
  }

  isSelected(option: DropdownOption): boolean {
    if (this.isMulti) {
      return Array.isArray(this.value) && this.value.includes(option.value);
    }
    return this.value === option.value;
  }

  isPlaceholderActive(): boolean {
    if (this.isMulti) {
      return !Array.isArray(this.value) || this.value.length === 0;
    }
    return !this.value;
  }

  getTriggerLabel(): string {
    const selected = this.getSelectedOptions();
    if (this.isMulti) {
      return selected.length ? `${selected.length} selected` : this.placeholder;
    }
    return selected.length ? selected[0].label : this.placeholder;
  }

  getSelectedOptions(): DropdownOption[] {
    if (this.isMulti) {
      return this.options.filter((opt) => Array.isArray(this.value) && this.value.includes(opt.value));
    }
    const match = this.options.find((opt) => opt.value === this.value);
    return match ? [match] : [];
  }

  selectOption(option: DropdownOption, event?: MouseEvent) {
    if (event) event.stopPropagation();

    if (this.isMulti) {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(option.value);

      if (index >= 0) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }
      this.value = currentValues;
      this.valueChange.emit(this.value);
    } else {
      this.value = option.value;
      this.valueChange.emit(this.value);
      this.close();
    }
  }

  removeChip(option: DropdownOption, event: MouseEvent) {
    event.stopPropagation();
    if (this.isMulti && Array.isArray(this.value)) {
      this.value = this.value.filter((v) => v !== option.value);
      this.valueChange.emit(this.value);
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const visible = this.getVisibleOptions();
    if (!this.isOpen || visible.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.focusedIndex = Math.min(this.focusedIndex + 1, visible.length - 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (this.focusedIndex >= 0 && this.focusedIndex < visible.length) {
        this.selectOption(visible[this.focusedIndex]);
      }
    } else if (event.key === "Escape") {
      this.close();
    }
  }
}
