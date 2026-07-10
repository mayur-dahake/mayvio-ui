import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mayvio-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mv-modal-overlay"
      [class.mv-modal-overlay--open]="isOpen"
      [attr.aria-hidden]="!isOpen"
      (click)="onOverlayClick()"
      #overlay
    >
      <div
        class="mv-modal"
        [ngClass]="'mv-modal--' + size + ' ' + className"
        role="dialog"
        aria-modal="true"
        (click)="$event.stopPropagation()"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() className = '';
  @Input() closeOnOutsideClick = true;
  @Input() closeOnEscape = true;

  @Output() onClose = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (this.isOpen && this.closeOnEscape) {
      this.onClose.emit();
    }
  }

  onOverlayClick() {
    if (this.closeOnOutsideClick) {
      this.onClose.emit();
    }
  }
}

@Component({
  selector: 'mayvio-modal-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-modal-header" [ngClass]="className">
      <div class="mv-modal-title">
        <ng-content></ng-content>
      </div>
      <button
        *ngIf="showCloseButton"
        type="button"
        class="mv-modal-close"
        aria-label="Close modal"
        (click)="closeModal()"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  `,
})
export class ModalHeaderComponent {
  @Input() showCloseButton = true;
  @Input() className = '';

  // Inject parent ModalComponent to trigger its close emitter
  private parentModal = inject(ModalComponent, { optional: true });

  closeModal() {
    if (this.parentModal) {
      this.parentModal.onClose.emit();
    }
  }
}

@Component({
  selector: 'mayvio-modal-body',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-modal-body" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class ModalBodyComponent {
  @Input() className = '';
}

@Component({
  selector: 'mayvio-modal-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mv-modal-footer" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
})
export class ModalFooterComponent {
  @Input() className = '';
}
