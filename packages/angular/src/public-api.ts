export * from "./data-grid.component";
export * from "./date-picker.component";
export * from "./dropdown.component";
export * from "./file-upload.component";
export * from "./modal.directive";
export * from "./multi-select.component";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { DataGridComponent } from "./data-grid.component";
import { DatePickerComponent } from "./date-picker.component";
import { DropdownComponent } from "./dropdown.component";
import { FileUploadComponent } from "./file-upload.component";
import { ModalTargetDirective } from "./modal.directive";
import { MultiSelectComponent } from "./multi-select.component";

@NgModule({
  declarations: [
    DataGridComponent,
    DatePickerComponent,
    DropdownComponent,
    FileUploadComponent,
    ModalTargetDirective,
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DataGridComponent,
    DatePickerComponent,
    DropdownComponent,
    FileUploadComponent,
    ModalTargetDirective,
    MultiSelectComponent,
    FormsModule
  ]
})
export class MayvioUIModule {}
