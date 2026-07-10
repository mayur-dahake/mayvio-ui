import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandPaletteItemConfig } from 'mayvio-ui/commandpalette';
import 'mayvio-ui/commandpalette/css';

@Component({
  selector: 'mv-commandpalette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="isOpen"
      class="mv-commandpalette-overlay mv-commandpalette-overlay--open"
      (click)="closePalette()"
    >
      <div
        class="mv-commandpalette"
        [class]="className"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        (click)="$event.stopPropagation()"
      >
        <div class="mv-commandpalette-search-wrapper">
          <svg
            class="mv-commandpalette-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            class="mv-commandpalette-input"
            [placeholder]="placeholder"
            [ngModel]="search"
            (ngModelChange)="onSearchChange($event)"
            (keydown)="onKeyDown($event)"
            #searchInput
          />
          <button
            *ngIf="search"
            class="mv-commandpalette-icon"
            style="background: none; border: none; cursor: pointer"
            (click)="onSearchChange('')"
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
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
        </div>

        <div class="mv-commandpalette-list" role="listbox">
          <div *ngIf="flattenedList.length === 0" class="mv-commandpalette-empty">
            {{ emptyText }}
          </div>

          <ng-container *ngFor="let group of groups">
            <div *ngIf="groupedCommands[group].length > 0">
              <div class="mv-commandpalette-group" *ngIf="group">{{ group }}</div>

              <div
                *ngFor="let cmd of groupedCommands[group]"
                class="mv-commandpalette-item"
                role="option"
                [attr.aria-selected]="isSelected(cmd)"
                (click)="selectCommand(cmd)"
                (mouseenter)="onMouseEnter(cmd)"
              >
                <div class="mv-commandpalette-item-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
                <div style="flex-grow: 1">{{ cmd.label }}</div>
                <div *ngIf="cmd.shortcut" style="display: flex; gap: 4px;">
                  <kbd
                    *ngFor="let key of cmd.shortcut"
                    style="font-size: 0.75rem; padding: 2px 4px; background: var(--mv-color-bg-subtle); border-radius: var(--mv-radius-sm);"
                  >
                    {{ key }}
                  </kbd>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export class CommandPaletteComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() commands: CommandPaletteItemConfig[] = [];
  @Input() placeholder = 'Search commands...';
  @Input() emptyText = 'No results found.';
  @Input() className = '';

  @Output() close = new EventEmitter<void>();
  @Output() commandSelect = new EventEmitter<CommandPaletteItemConfig>();

  search = '';
  selectedIndex = 0;

  filteredCommands: CommandPaletteItemConfig[] = [];
  groupedCommands: Record<string, CommandPaletteItemConfig[]> = {};
  groups: string[] = [];
  flattenedList: CommandPaletteItemConfig[] = [];

  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.updateLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['commands'] || changes['isOpen']) {
      if (changes['isOpen'] && this.isOpen) {
        this.search = '';
        this.selectedIndex = 0;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          const input = document.querySelector('.mv-commandpalette-input') as HTMLInputElement;
          if (input) input.focus();
        });
      } else if (changes['isOpen'] && !this.isOpen) {
        document.body.style.overflow = '';
      }
      this.updateLists();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onGlobalKeyDown(e: KeyboardEvent) {
    if (this.isOpen && e.key === 'Escape') {
      this.closePalette();
    }
  }

  closePalette() {
    this.close.emit();
  }

  onSearchChange(val: string) {
    this.search = val;
    this.selectedIndex = 0;
    this.updateLists();
  }

  updateLists() {
    if (!this.search) {
      this.filteredCommands = this.commands;
    } else {
      const q = this.search.toLowerCase();
      this.filteredCommands = this.commands.filter((cmd) => cmd.label.toLowerCase().includes(q));
    }

    this.groupedCommands = { '': [] };
    this.filteredCommands.forEach((cmd) => {
      const g = cmd.group || '';
      if (!this.groupedCommands[g]) this.groupedCommands[g] = [];
      this.groupedCommands[g].push(cmd);
    });

    this.groups = Object.keys(this.groupedCommands).sort();

    this.flattenedList = [];
    this.groups.forEach((g) => {
      this.flattenedList.push(...this.groupedCommands[g]);
    });

    this.cdr.markForCheck();
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.flattenedList.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex =
        this.selectedIndex < this.flattenedList.length - 1 ? this.selectedIndex + 1 : 0;
      this.cdr.markForCheck();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex =
        this.selectedIndex > 0 ? this.selectedIndex - 1 : this.flattenedList.length - 1;
      this.cdr.markForCheck();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.selectCommand(this.flattenedList[this.selectedIndex]);
    }
  }

  onMouseEnter(cmd: CommandPaletteItemConfig) {
    const idx = this.flattenedList.findIndex((c) => c.id === cmd.id);
    if (idx !== -1) {
      this.selectedIndex = idx;
      this.cdr.markForCheck();
    }
  }

  isSelected(cmd: CommandPaletteItemConfig): boolean {
    return this.flattenedList[this.selectedIndex]?.id === cmd.id;
  }

  selectCommand(cmd: CommandPaletteItemConfig) {
    this.commandSelect.emit(cmd);
    this.closePalette();
  }
}
