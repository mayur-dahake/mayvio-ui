// @ts-nocheck
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { initDatePicker } from "mayvio-ui/scripts/components/date-picker.js";

/**
 * DatePickerComponent
 * Angular integration example for the Mayvio UI Date Picker component.
 */
@Component({
  selector: "mayvio-date-picker",
  template: `
    <div class="dp-wrapper" [attr.data-range]="rangeMode ? 'true' : null">
      <div class="dp-input-group">
        <input class="dp-input" type="text"
          [placeholder]="rangeMode ? 'Start → End' : 'YYYY-MM-DD'"
          readonly
          aria-haspopup="dialog" />
        <button class="dp-trigger" type="button" aria-label="Open calendar">📅</button>
      </div>
      <div class="dp-popup" role="dialog" aria-label="Calendar" aria-hidden="true"></div>
    </div>
  `
})
export class DatePickerComponent implements OnInit {
  @Input() rangeMode = false;
  @Output() dateSelected = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const wrapper = this.el.nativeElement.querySelector(".dp-wrapper");
    if (wrapper) {
      initDatePicker(wrapper);
    }
  }
}
