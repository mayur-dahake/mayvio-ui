import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioGroupConfig, RadioOption } from 'mayvio-ui/radiogroup';
import 'mayvio-ui/radiogroup/css';

@Component({
  selector: 'mv-radiogroup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="'mv-radiogroup ' + (orientation === 'horizontal' ? 'mv-radiogroup--horizontal' : '') + (className ? ' ' + className : '')"
      role="radiogroup"
    >
      <label 
        *ngFor="let opt of options; let i = index"
        [class]="'mv-radio-wrapper ' + (disabled || opt.disabled ? 'mv-radio-wrapper--disabled ' : '') + (error ? 'mv-radio-wrapper--error' : '')"
      >
        <input
          type="radio"
          class="mv-radio-input"
          [name]="name"
          [value]="opt.value"
          [checked]="value === opt.value"
          [disabled]="disabled || opt.disabled"
          (change)="onChangeEvent(opt.value)"
          (blur)="onTouched()"
        />
        <div class="mv-radio-control" aria-hidden="true">
          <div class="mv-radio-icon"></div>
        </div>
        <span class="mv-radio-label">{{ opt.label }}</span>
      </label>
    </div>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor, RadioGroupConfig {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() name = 'radiogroup_' + Math.random().toString(36).substr(2, 9);
  @Input() error = false;
  @Input() disabled = false;
  @Input() options: RadioOption[] = [];
  @Input() className = '';

  value?: string;

  onChange = (val: string) => {};
  onTouched = () => {};

  onChangeEvent(val: string) {
    if (this.disabled) return;
    this.value = val;
    this.onChange(val);
  }

  writeValue(value: string): void {
    this.value = value;
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
