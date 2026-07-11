import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectConfig } from 'mayvio-ui/select';
import 'mayvio-ui/select/css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'mv-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mv-select-wrapper">
      <select
        [disabled]="disabled"
        [class]="'mv-select mv-select--' + size + (error ? ' mv-select--error' : '') + (className ? ' ' + className : '')"
        [attr.aria-invalid]="error ? 'true' : null"
        [value]="value"
        (change)="onChangeEvent($event)"
        (blur)="onTouched()"
      >
        <option *ngFor="let opt of options" [value]="opt.value" [disabled]="opt.disabled">
          {{ opt.label }}
        </option>
      </select>
      <div class="mv-select-icon">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, SelectConfig {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() error = false;
  @Input() disabled = false;
  @Input() options: SelectOption[] = [];
  @Input() className = '';

  value?: string;

  onChange = (val: string) => {};
  onTouched = () => {};

  onChangeEvent(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
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
