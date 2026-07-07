import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'mv-button',
  standalone: true,
  template: `
    <button [class]="hostClass()" [disabled]="_disabled()">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'success' | 'error' | 'warning' = 'primary';
  @Input() shape: 'rectangle' | 'square' | 'round' = 'rectangle';
  @Input() disabled = false;

  readonly _variant = signal<'primary' | 'secondary' | 'outline' | 'text'>('primary');
  readonly _size = signal<'sm' | 'md' | 'lg'>('md');
  readonly _color = signal<'primary' | 'success' | 'error' | 'warning'>('primary');
  readonly _shape = signal<'rectangle' | 'square' | 'round'>('rectangle');
  readonly _disabled = signal<boolean>(false);

  ngOnChanges(): void {
    this._variant.set(this.variant);
    this._size.set(this.size);
    this._color.set(this.color);
    this._shape.set(this.shape);
    this._disabled.set(this.disabled);
  }

  readonly hostClass = computed(() => {
    const classes = ['mv-button', `mv-button--${this._variant()}`, `mv-button--${this._size()}`];
    if (this._color() !== 'primary') {
      classes.push(`mv-button--${this._color()}`);
    }
    if (this._shape() !== 'rectangle') {
      classes.push(`mv-button--${this._shape()}`);
    }
    return classes.join(' ');
  });
}
