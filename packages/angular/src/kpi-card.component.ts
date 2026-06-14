// @ts-nocheck
import { Component, Input, OnInit, ElementRef } from "@angular/core";
import { initKpiCards } from "mayvio-ui/scripts/components/kpi-card.js";

/**
 * KpiCardComponent
 * Angular wrapper component representing the Mayvio UI KPI Card.
 */
@Component({
  selector: "mayvio-kpi-card",
  template: `
    <div class="kpi-card {{ className }}">
      <div class="kpi-card-header">
        <span class="kpi-card-title">{{ title }}</span>
        <span *ngIf="icon" class="kpi-card-icon">{{ icon }}</span>
      </div>
      <div class="kpi-card-body">
        <span
          class="kpi-card-value"
          [attr.data-value]="value"
          [attr.data-duration]="duration"
          [attr.data-decimals]="decimals"
          [attr.data-prefix]="prefix"
          [attr.data-suffix]="suffix"
        >
          {{ prefix }}0{{ suffix }}
        </span>
        <span *ngIf="trend" class="kpi-card-trend {{ trendDirection }}">
          {{ trendDirection === "up" ? "↑" : "↓" }} {{ trend }}
        </span>
      </div>
      <div *ngIf="footer" class="kpi-card-footer">{{ footer }}</div>
    </div>
  `
})
export class KpiCardComponent implements OnInit {
  @Input() title = "";
  @Input() value = 0;
  @Input() icon = "";
  @Input() trend = "";
  @Input() trendDirection: "up" | "down" = "up";
  @Input() footer = "";
  @Input() duration = 1500;
  @Input() decimals = 0;
  @Input() prefix = "";
  @Input() suffix = "";
  @Input() className = "";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const valNode = this.el.nativeElement.querySelector(".kpi-card-value");
    if (valNode) {
      initKpiCards(valNode);
    }
  }
}
