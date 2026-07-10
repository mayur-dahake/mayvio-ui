import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ─── Shared service to link trigger, menu, and items ──────────────────────────
// We use a lightweight approach: the parent DropdownComponent holds state,
// sub-components/directives receive it via injection.

@Component({
  selector: 'mayvio-dropdown',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: { class: 'mv-dropdown', style: 'position:relative;display:inline-block' },
})
export class DropdownComponent implements OnDestroy {
  @Input() align: 'left' | 'center' | 'right' = 'left';

  private _isOpen = signal(false);

  get isOpen(): boolean {
    return this._isOpen();
  }

  private cdr = inject(ChangeDetectorRef);

  toggle() {
    this._isOpen.update((v) => !v);
    this.cdr.markForCheck();
  }

  close() {
    this._isOpen.set(false);
    this.cdr.markForCheck();
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.isOpen && this.closeOnOutsideClick) {
      this.close();
    }
  }

  ngOnDestroy() {}
}

// ─── Trigger Directive ────────────────────────────────────────────────────────
@Directive({
  selector: '[mvDropdownTrigger]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"menu"',
    '[attr.aria-expanded]': 'dropdown.isOpen',
  },
})
export class DropdownTriggerDirective {
  dropdown = inject(DropdownComponent);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.dropdown.toggle();
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.dropdown.isOpen) {
      this.dropdown.close();
    }
  }
}

// ─── Menu Component ───────────────────────────────────────────────────────────
@Component({
  selector: 'mayvio-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mv-dropdown-menu"
      [ngClass]="{
        'mv-dropdown-menu--open': dropdown.isOpen,
        'mv-dropdown-menu--right': dropdown.align === 'right',
        'mv-dropdown-menu--center': dropdown.align === 'center',
      }"
      role="menu"
      [attr.aria-hidden]="!dropdown.isOpen"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class DropdownMenuComponent {
  dropdown = inject(DropdownComponent);
}

// ─── Item Component ───────────────────────────────────────────────────────────
@Component({
  selector: 'mayvio-dropdown-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="mv-dropdown-item"
      [class.mv-dropdown-item--disabled]="disabled"
      role="menuitem"
      [disabled]="disabled"
      (click)="onItemClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class DropdownItemComponent {
  @Input() disabled = false;
  @Output() itemClick = new EventEmitter<void>();

  private dropdown = inject(DropdownComponent);

  onItemClick(event: MouseEvent) {
    if (this.disabled) return;
    event.stopPropagation();
    this.itemClick.emit();
    this.dropdown.close();
  }
}
