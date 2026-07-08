import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'mayvio-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="mv-theme-toggle"
      [ngClass]="className"
      [attr.aria-label]="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      (click)="toggleTheme()"
    >
      <svg
        class="mv-theme-toggle__icon mv-theme-toggle__icon--sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        class="mv-theme-toggle__icon mv-theme-toggle__icon--moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  `,
})
export class ThemeToggleComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  @Input() className = '';

  private _theme?: 'light' | 'dark';
  @Input()
  set theme(value: 'light' | 'dark' | undefined) {
    this._theme = value;
    this.cdr.markForCheck();
  }
  get theme(): 'light' | 'dark' | undefined {
    return this._theme;
  }

  @Output() themeToggled = new EventEmitter<void>();

  private internalTheme: 'light' | 'dark' = 'light';

  get isDark(): boolean {
    return (this.theme || this.internalTheme) === 'dark';
  }

  ngOnInit() {
    if (this.theme === undefined && isPlatformBrowser(this.platformId)) {
      const isDark = document.documentElement.classList.contains('dark');
      this.internalTheme = isDark ? 'dark' : 'light';
      this.cdr.markForCheck();
    }
  }

  toggleTheme() {
    if (this.themeToggled.observed) {
      this.themeToggled.emit();
    } else {
      if (isPlatformBrowser(this.platformId)) {
        const root = document.documentElement;
        if (root.classList.contains('dark')) {
          root.classList.remove('dark');
          this.internalTheme = 'light';
        } else {
          root.classList.add('dark');
          this.internalTheme = 'dark';
        }
        this.cdr.markForCheck();
      }
    }
  }
}
