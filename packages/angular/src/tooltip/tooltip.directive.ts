import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  selector: '[mvTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('mvTooltip') content = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() delay = 0;

  private tooltipEl!: HTMLElement;
  private id = `mv-tooltip-${Math.random().toString(36).substr(2, 9)}`;
  private timer: ReturnType<typeof setTimeout> | null = null;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {}

  ngOnInit(): void {
    // Set up host attributes
    this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', this.id);
    this.createTooltip();
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.tooltipEl && this.tooltipEl.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
    }
  }

  private createTooltip(): void {
    this.tooltipEl = this.renderer.createElement('div');
    this.renderer.setAttribute(this.tooltipEl, 'id', this.id);
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');

    // Add base classes
    this.renderer.addClass(this.tooltipEl, 'mv-tooltip');
    this.renderer.addClass(this.tooltipEl, `mv-tooltip--${this.placement}`);

    const text = this.renderer.createText(this.content);
    this.renderer.appendChild(this.tooltipEl, text);

    // Append to body or parent (we append next to host element or container)
    const parent = this.el.nativeElement.parentNode;
    if (parent) {
      this.renderer.appendChild(parent, this.tooltipEl);
    }
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.delay > 0) {
      this.timer = setTimeout(() => this.setVisible(true), this.delay);
    } else {
      this.setVisible(true);
    }
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    if (this.timer) clearTimeout(this.timer);
    this.setVisible(false);
  }

  private setVisible(visible: boolean): void {
    if (visible) {
      this.renderer.addClass(this.tooltipEl, 'mv-tooltip--visible');
    } else {
      this.renderer.removeClass(this.tooltipEl, 'mv-tooltip--visible');
    }
  }
}
