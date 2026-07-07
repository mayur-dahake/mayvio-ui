// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from '@angular/common';

/**
 * SkeletonComponent
 * Angular wrapper component for the Mayvio UI Skeleton Loader.
 */
@Component({
  selector: "mayvio-skeleton",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="classes" [ngStyle]="styles"></div>
  `
})
export class SkeletonComponent {
  @Input() variant: "line" | "avatar" | "block" | "rect" = "line";
  @Input() animation: "shimmer" | "wave" | "pulse" = "shimmer";
  @Input() width?: string;
  @Input() height?: string;

  get classes() {
    return {
      "skeleton": true,
      "avatar": this.variant === "avatar",
      "line": this.variant === "line",
      "block": this.variant === "block" || this.variant === "rect",
      "shimmer": this.animation === "shimmer",
      "wave": this.animation === "wave",
      "pulse": this.animation === "pulse"
    };
  }

  get styles() {
    return {
      ...(this.width ? { width: this.width } : {}),
      ...(this.height ? { height: this.height } : {})
    };
  }
}
