import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'mv-progress-bar',
  standalone: true,
  template: `
    <div
      [class]="hostClass()"
      role="progressbar"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="_max()"
      [attr.aria-valuenow]="ariaValueNow()"
    >
      <div
        [class]="
          _indeterminate()
            ? 'mv-progress-bar__track mv-progress-bar__track--indeterminate'
            : 'mv-progress-bar__track'
        "
      >
        <div class="mv-progress-bar__fill" [style.width]="fillWidth()"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnChanges {
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() indeterminate = false;

  readonly _value = signal<number>(0);
  readonly _max = signal<number>(100);
  readonly _size = signal<'sm' | 'md' | 'lg'>('md');
  readonly _indeterminate = signal<boolean>(false);

  ngOnChanges(): void {
    this._value.set(this.value);
    this._max.set(this.max);
    this._size.set(this.size);
    this._indeterminate.set(this.indeterminate);
  }

  readonly hostClass = computed(() => {
    return `mv-progress-bar mv-progress-bar--${this._size()}`;
  });

  readonly percentage = computed(() => {
    if (this._indeterminate()) return undefined;
    const val = this._value();
    const maxVal = this._max();
    return Math.min(100, Math.max(0, (val / maxVal) * 100));
  });

  readonly fillWidth = computed(() => {
    const pct = this.percentage();
    return pct !== undefined ? `${pct}%` : undefined;
  });

  readonly ariaValueNow = computed(() => {
    const pct = this.percentage();
    return pct !== undefined ? this._value() : undefined;
  });
}
