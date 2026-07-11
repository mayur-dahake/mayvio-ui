import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextareaConfig } from 'mayvio-ui/textarea';
import 'mayvio-ui/textarea/css';

@Component({
  selector: 'mv-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <textarea
      #textarea
      [disabled]="disabled"
      [attr.aria-invalid]="error ? 'true' : null"
      [class]="'mv-textarea' + (error ? ' mv-textarea--error' : '') + (className ? ' ' + className : '')"
      [placeholder]="placeholder"
      [value]="value"
      [style.overflow]="autoResize ? 'hidden' : null"
      [style.resize]="autoResize ? 'none' : null"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor, TextareaConfig {
  @Input() error = false;
  @Input() disabled = false;
  @Input() autoResize = false;
  @Input() placeholder = '';
  @Input() className = '';

  @ViewChild('textarea', { static: true }) textareaRef!: ElementRef<HTMLTextAreaElement>;

  value = '';

  onChange = (val: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.onChange(val);
    this.handleAutoResize();
  }

  handleAutoResize() {
    if (this.autoResize && this.textareaRef?.nativeElement) {
      this.textareaRef.nativeElement.style.height = 'auto';
      this.textareaRef.nativeElement.style.height = this.textareaRef.nativeElement.scrollHeight + 'px';
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
    setTimeout(() => this.handleAutoResize(), 0);
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
