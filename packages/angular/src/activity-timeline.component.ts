// @ts-nocheck
import { Component, Input } from "@angular/core";

/**
 * ActivityTimelineItemComponent
 * Individual card inside the timeline tree flow.
 */
@Component({
  selector: "mayvio-activity-timeline-item",
  template: `
    <div class="timeline-item {{ className }}">
      <div class="timeline-badge {{ status }}" aria-hidden="true"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h4 class="timeline-title">{{ title }}</h4>
          <span *ngIf="time" class="timeline-time">{{ time }}</span>
        </div>
        <p *ngIf="hasDesc" class="timeline-desc">
          <ng-content></ng-content>
        </p>
      </div>
    </div>
  `
})
export class ActivityTimelineItemComponent {
  @Input() status: "primary" | "success" | "warning" | "error" | "info" = "info";
  @Input() time = "";
  @Input() title = "";
  @Input() hasDesc = true;
  @Input() className = "";
}

/**
 * ActivityTimelineComponent
 * Container representing the vertical status event connector thread.
 */
@Component({
  selector: "mayvio-activity-timeline",
  template: `
    <div class="timeline {{ className }}">
      <ng-content></ng-content>
    </div>
  `
})
export class ActivityTimelineComponent {
  @Input() className = "";
}
