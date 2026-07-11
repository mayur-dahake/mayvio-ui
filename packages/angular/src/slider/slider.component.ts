import { Component, ChangeDetectionStrategy, Input, forwardRef, ViewEncapsulation, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SliderConfig } from 'mayvio-ui/slider';
import 'mayvio-ui/slider/css';

@Component({
  selector: 'mv-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="'mv-slider-wrapper ' + (disabled ? 'mv-slider-wrapper--disabled ' : '') + className"
      (pointerdown)="onPointerDown($event)"
    >
      <div class="mv-slider-track" #trackRef>
        <div class="mv-slider-range" [style.width]="percentage + '%'"></div>
      </div>
      <div
        class="mv-slider-thumb"
        [style.left]="percentage + '%'"
        role="slider"
        [attr.tabindex]="disabled ? -1 : 0"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="value"
        [attr.aria-disabled]="disabled"
        (keydown)="onKeyDown($event)"
        (blur)="onTouched()"
      ></div>
    </div>
  `,
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent implements ControlValueAccessor, SliderConfig, OnInit {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() className = '';

  @ViewChild('trackRef') trackRef!: ElementRef<HTMLDivElement>;

  private isDragging = false;

  get percentage() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  ngOnInit() {
    this.value = Math.max(this.min, Math.min(this.value, this.max));
  }

  onChange = (val: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.value = Math.max(this.min, Math.min(value, this.max));
    }
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

  private updateValue(clientX: number) {
    if (this.disabled || !this.trackRef) return;
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = percent * (this.max - this.min) + this.min;
    
    let newValue = Math.round(rawValue / this.step) * this.step;
    newValue = Math.min(Math.max(newValue, this.min), this.max);

    if (newValue !== this.value) {
      this.value = newValue;
      this.onChange(newValue);
    }
  }

  onPointerDown(e: PointerEvent) {
    if (this.disabled) return;
    this.isDragging = true;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    this.updateValue(e.clientX);
  }

  @HostListener('pointermove', ['$event'])
  onPointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    this.updateValue(e.clientX);
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  onPointerUp(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const el = e.currentTarget as HTMLElement;
    if (el && el.releasePointerCapture) {
      // It might be document, so only call if exists
      try { el.releasePointerCapture(e.pointerId); } catch(e) {}
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    let newValue = this.value;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      newValue = Math.min(this.value + this.step, this.max);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      newValue = Math.max(this.value - this.step, this.min);
    }
    
    if (newValue !== this.value) {
      this.value = newValue;
      this.onChange(newValue);
    }
  }
}
