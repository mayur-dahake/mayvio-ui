import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputConfig } from 'mayvio-ui/input';
import 'mayvio-ui/input/css';

@Component({
  selector: 'mv-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      [type]="type"
      [disabled]="disabled"
      [attr.aria-invalid]="error ? 'true' : null"
      [class]="'mv-input mv-input--' + size + (error ? ' mv-input--error' : '') + (className ? ' ' + className : '')"
      [placeholder]="placeholder"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, InputConfig {
  @Input() type = 'text';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() error = false;
  @Input() disabled = false;
  @Input() placeholder = '';
  @Input() className = '';

  value = '';

  onChange = (val: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  writeValue(value: string): void {
    this.value = value || '';
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
