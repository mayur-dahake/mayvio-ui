import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CheckboxConfig } from 'mayvio-ui/checkbox';
import 'mayvio-ui/checkbox/css';

@Component({
  selector: 'mv-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [class]="'mv-checkbox-wrapper' + (disabled ? ' mv-checkbox-wrapper--disabled' : '') + (error ? ' mv-checkbox-wrapper--error' : '') + (className ? ' ' + className : '')">
      <input
        #inputRef
        type="checkbox"
        class="mv-checkbox-input"
        [disabled]="disabled"
        [checked]="checked"
        (change)="onChangeEvent($event)"
        (blur)="onTouched()"
      />
      <div class="mv-checkbox-control" aria-hidden="true">
        <svg class="mv-checkbox-icon" viewBox="0 0 15 15">
          <ng-container *ngIf="indeterminate; else checkIcon">
            <path d="M4 7.5H11" stroke-width="2" />
          </ng-container>
          <ng-template #checkIcon>
            <path d="M3.5 7.5L6 10L11.5 4" stroke-width="2" />
          </ng-template>
        </svg>
      </div>
      <span *ngIf="label" class="mv-checkbox-label">{{ label }}</span>
    </label>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, CheckboxConfig, OnChanges {
  @Input() label?: string;
  @Input() error = false;
  @Input() disabled = false;
  @Input() indeterminate = false;
  @Input() checked = false;
  @Input() className = '';

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  onChange = (val: boolean) => {};
  onTouched = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['indeterminate'] && this.inputRef) {
      this.inputRef.nativeElement.indeterminate = this.indeterminate;
    }
  }

  onChangeEvent(event: Event) {
    const val = (event.target as HTMLInputElement).checked;
    this.checked = val;
    this.onChange(val);
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
