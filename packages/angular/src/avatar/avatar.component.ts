import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'mv-avatar',
  standalone: true,
  imports: [NgIf],
  template: `
    <span [class]="hostClass()">
      <img *ngIf="_src()" class="mv-avatar__image" [src]="_src()" [attr.alt]="_alt()" />
      <span *ngIf="!_src() && _initials()" class="mv-avatar__initials" aria-hidden="true">{{
        _initials()
      }}</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnChanges {
  @Input() src = '';
  @Input() alt = '';
  @Input() initials = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() status: 'online' | 'offline' | 'busy' | '' = '';

  readonly _src = signal('');
  readonly _alt = signal('');
  readonly _initials = signal('');
  readonly _size = signal<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly _shape = signal<'circle' | 'square'>('circle');
  readonly _status = signal<'online' | 'offline' | 'busy' | ''>('');

  ngOnChanges(): void {
    this._src.set(this.src);
    this._alt.set(this.alt);
    this._initials.set(this.initials);
    this._size.set(this.size);
    this._shape.set(this.shape);
    this._status.set(this.status);
  }

  readonly hostClass = computed(() => {
    const classes = ['mv-avatar', `mv-avatar--${this._size()}`];
    if (this._shape() === 'square') classes.push('mv-avatar--square');
    if (this._status()) classes.push(`mv-avatar--${this._status()}`);
    return classes.join(' ');
  });
}

@Component({
  selector: 'mv-avatar-group',
  standalone: true,
  template: `
    <div [class]="hostClass()">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() limit?: number;

  readonly hostClass = computed(() =>
    ['mv-avatar-group', `mv-avatar-group--${this.size}`].join(' ')
  );
}
