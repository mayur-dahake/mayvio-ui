import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'mv-skeleton',
  standalone: true,
  template: `
    <div
      [class]="hostClass()"
      [style.width]="hostWidth()"
      [style.height]="hostHeight()"
      aria-busy="true"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent implements OnChanges {
  @Input() variant: 'text' | 'circle' | 'rect' = 'text';
  @Input() animation: 'shimmer' | 'pulse' | 'wave' | 'none' = 'shimmer';
  @Input() width?: string | number;
  @Input() height?: string | number;

  readonly _variant = signal<'text' | 'circle' | 'rect'>('text');
  readonly _animation = signal<'shimmer' | 'pulse' | 'wave' | 'none'>('shimmer');
  readonly _width = signal<string | number | undefined>(undefined);
  readonly _height = signal<string | number | undefined>(undefined);

  ngOnChanges(): void {
    this._variant.set(this.variant);
    this._animation.set(this.animation);
    this._width.set(this.width);
    this._height.set(this.height);
  }

  readonly hostClass = computed(() => {
    const classes = ['mv-skeleton', `mv-skeleton--${this._variant()}`];
    if (this._animation() !== 'none') {
      classes.push(`mv-skeleton--${this._animation()}`);
    }
    return classes.join(' ');
  });

  private formatSize(val?: string | number): string {
    if (val === undefined || val === null) return '';
    if (typeof val === 'number') return `${val}px`;
    return val;
  }

  readonly hostWidth = computed(() => this.formatSize(this._width()));
  readonly hostHeight = computed(() => this.formatSize(this._height()));
}
