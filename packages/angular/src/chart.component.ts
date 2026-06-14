// @ts-nocheck
import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChanges } from "@angular/core";
import { MayvioChart } from "mayvio-ui/scripts/components/chart.js";

/**
 * ChartComponent
 * Angular wrapper component representing the SVG-based charts.
 */
@Component({
  selector: "mayvio-chart",
  template: `
    <div class="chart-container {{ className }}">
      <div *ngIf="title" class="chart-header">
        <div class="chart-title">{{ title }}</div>
      </div>
      <div class="canvas-holder"></div>
    </div>
  `
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() type = "line";
  @Input() data: any = { labels: [], datasets: [] };
  @Input() options: any = {};
  @Input() title = "";
  @Input() className = "";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes["type"] || changes["data"] || changes["options"]) &&
      !changes["data"]?.isFirstChange()
    ) {
      this.createChart();
    }
  }

  private createChart() {
    const holder = this.el.nativeElement.querySelector(".canvas-holder");
    if (holder) {
      new MayvioChart(holder, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    }
  }
}
