import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SwitchConfig } from 'mayvio-ui/switch';
import 'mayvio-ui/switch/css';

@Component({
  selector: 'mv-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [class]="'mv-switch-wrapper' + (disabled ? ' mv-switch-wrapper--disabled' : '') + (className ? ' ' + className : '')">
      <input
        type="checkbox"
        class="mv-switch-input"
        [disabled]="disabled"
        [checked]="checked"
        (change)="onChangeEvent($event)"
        (blur)="onTouched()"
      />
      <div class="mv-switch-control" aria-hidden="true">
        <div class="mv-switch-thumb"></div>
      </div>
      <span *ngIf="label" class="mv-switch-label">{{ label }}</span>
    </label>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements ControlValueAccessor, SwitchConfig {
  @Input() label?: string;
  @Input() disabled = false;
  @Input() checked = false;
  @Input() className = '';

  onChange = (val: boolean) => {};
  onTouched = () => {};

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
