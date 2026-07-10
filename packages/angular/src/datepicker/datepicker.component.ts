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
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import 'mayvio-ui/datepicker/css';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface DayObj {
  date: Date;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'mv-datepicker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-datepicker" [class.mv-datepicker--open]="isOpen" [class]="className">
      <button
        type="button"
        class="mv-datepicker-trigger"
        [class.mv-datepicker-trigger--disabled]="disabled"
        (click)="toggleMenu()"
        [disabled]="disabled"
        [attr.aria-label]="value ? 'Selected date: ' + formattedDate : 'Choose date'"
      >
        <span [class.mv-datepicker-placeholder]="!value">
          {{ formattedDate }}
        </span>
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </button>

      <div class="mv-datepicker-popup" role="dialog" aria-label="Calendar" *ngIf="isOpen">
        <div class="mv-datepicker-header">
          <button
            type="button"
            class="mv-datepicker-nav-btn"
            (click)="prevMonth($event)"
            aria-label="Previous month"
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="mv-datepicker-current-month" aria-live="polite">
            {{ currentMonthName }} {{ currentYear }}
          </div>
          <button
            type="button"
            class="mv-datepicker-nav-btn"
            (click)="nextMonth($event)"
            aria-label="Next month"
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
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="mv-datepicker-grid" role="grid">
          <div
            *ngFor="let name of dayNames"
            class="mv-datepicker-day-name"
            role="columnheader"
            [attr.aria-label]="name"
          >
            {{ name }}
          </div>

          <div
            *ngFor="let dayObj of days; let i = index"
            class="mv-datepicker-cell"
            [class.mv-datepicker-cell--outside-month]="!dayObj.isCurrentMonth"
            [class.mv-datepicker-cell--selected]="isSelected(dayObj.date)"
            [class.mv-datepicker-cell--today]="isToday(dayObj.date)"
            [class.mv-datepicker-cell--disabled]="isDisabled(dayObj.date)"
            role="gridcell"
            [attr.aria-selected]="isSelected(dayObj.date)"
            [attr.aria-disabled]="isDisabled(dayObj.date)"
            (click)="selectDate(dayObj.date)"
          >
            {{ dayObj.date.getDate() }}
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() value?: Date;
  @Input() disabled = false;
  @Input() placeholder = 'Select date';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() className = '';

  @Output() dateChange = new EventEmitter<Date>();

  isOpen = false;
  viewDate: Date = new Date();

  dayNames = DAY_NAMES;
  days: DayObj[] = [];

  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.viewDate = this.value || new Date();
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !this.isOpen) {
      if (this.value) {
        this.viewDate = new Date(this.value);
      }
      this.generateCalendar();
    }
  }

  get formattedDate(): string {
    if (!this.value) return this.placeholder;
    return `${MONTH_NAMES[this.value.getMonth()]} ${this.value.getDate()}, ${this.value.getFullYear()}`;
  }

  get currentMonthName(): string {
    return MONTH_NAMES[this.viewDate.getMonth()];
  }

  get currentYear(): number {
    return this.viewDate.getFullYear();
  }

  generateCalendar() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const newDays: DayObj[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      newDays.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      newDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remainingCells = 42 - newDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      newDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    this.days = newDays;
  }

  toggleMenu() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.viewDate = this.value || new Date();
      this.generateCalendar();
    }
    this.cdr.markForCheck();
  }

  prevMonth(e: Event) {
    e.stopPropagation();
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.generateCalendar();
    this.cdr.markForCheck();
  }

  nextMonth(e: Event) {
    e.stopPropagation();
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.generateCalendar();
    this.cdr.markForCheck();
  }

  selectDate(d: Date) {
    if (this.disabled || this.isDisabled(d)) return;

    this.value = d;
    this.dateChange.emit(this.value);
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  isToday(d: Date): boolean {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  }

  isSelected(d: Date): boolean {
    if (!this.value) return false;
    return (
      d.getDate() === this.value.getDate() &&
      d.getMonth() === this.value.getMonth() &&
      d.getFullYear() === this.value.getFullYear()
    );
  }

  isDisabled(d: Date): boolean {
    if (this.minDate && d < this.minDate) return true;
    if (this.maxDate && d > this.maxDate) return true;
    return false;
  }

  @HostListener('document:mousedown', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (this.isOpen && !this.el.nativeElement.contains(target)) {
      this.isOpen = false;
      this.cdr.markForCheck();
    }
  }
}
