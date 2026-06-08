// @ts-nocheck
import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { initFileUpload } from "mayvio-ui/scripts/components/file-upload.js";

/**
 * FileUploadComponent
 * Angular integration example for the Mayvio UI File Upload Zone component.
 */
@Component({
  selector: "mayvio-file-upload",
  template: `
    <div class="fu-wrapper">
      <div class="fu-zone"
        role="region"
        aria-label="File upload drop zone"
        [attr.data-accept]="accept"
        [attr.data-max-size]="maxSizeMB">
        <input class="fu-input" type="file" multiple [accept]="accept" tabindex="-1" />
        <div class="fu-zone-icon" aria-hidden="true">☁️</div>
        <p class="fu-zone-title">Drop files here or browse</p>
        <p class="fu-zone-sub">Accepted: {{ accept }}</p>
        <button class="fu-browse-btn" type="button">Browse Files</button>
        <p class="fu-meta">Max size: {{ maxSizeMB }} MB per file</p>
      </div>
      <div class="fu-preview" aria-live="polite" aria-label="Uploaded files"></div>
    </div>
  `
})
export class FileUploadComponent implements OnInit {
  @Input() accept = "image/*,.pdf,.docx";
  @Input() maxSizeMB = 5;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const zone = this.el.nativeElement.querySelector(".fu-zone");
    if (zone) {
      initFileUpload(zone);
    }
  }
}
