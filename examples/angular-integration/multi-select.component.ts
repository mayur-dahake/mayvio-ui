// @ts-nocheck
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from "@angular/core";
// import { initMultiSelect } from "mayvio-ui/scripts/components/multi-select.js";

/**
 * MultiSelectComponent
 * Angular integration example for the Mayvio UI Multi-Select Dropdown component.
 */
@Component({
  selector: "mayvio-multi-select",
  template: `
    <div class="ms-wrapper" [attr.aria-label]="label" aria-expanded="false" aria-haspopup="listbox">
      <div class="ms-trigger" role="combobox" tabindex="0">
        <div class="ms-tags">
          <span class="ms-placeholder">{{ placeholder }}</span>
          <span class="ms-count" [hidden]="true">0</span>
        </div>
      </div>
      <div class="ms-dropdown" role="listbox" aria-multiselectable="true">
        <div class="ms-search-bar">
          <input class="ms-search" type="search" placeholder="Search..." />
        </div>
        <div class="ms-toolbar">
          <button class="ms-select-all" type="button">Select All</button>
          <button class="ms-clear-all" type="button" [disabled]="true">Clear All</button>
        </div>
        <ul class="ms-list" role="presentation"></ul>
      </div>
    </div>
  `
})
export class MultiSelectComponent implements OnInit {
  @Input() label = "Multi-select";
  @Input() placeholder = "Choose options...";
  @Output() selectionChange = new EventEmitter<string[]>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // initMultiSelect(this.el.nativeElement.querySelector(".ms-wrapper"));
  }
}
