export * from './data-grid.component';
export * from './datepicker/index';
export * from './dropdown/index';
export * from './multiselect/index';
export * from './fileupload/index';
export * from './modal/index';

export * from './theme-toggle/index';
export * from './skeleton/index';
export * from './toast/index';
export * from './accordion/index';
export * from './tabs/index';
export * from './tooltip/index';
export * from './badge/index';
export * from './avatar/index';
export * from './progress-bar/index';
export * from './alert/index';
export * from './commandpalette/index';
export * from './sidebar/index';
export * from './notificationcenter/index';
export * from './input/index';
export * from './textarea/index';
export * from './checkbox/index';
export * from './switch/index';
export * from './radiogroup/index';
export * from './select/index';
export * from './slider/index';
export * from './breadcrumb/index';
export * from './code-snippet.component';
export * from './button/index';

export * from './kpi-card.component';
export * from './chart.component';
export * from './dashboard-widget.component';
export * from './activity-timeline.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataGridComponent } from './data-grid.component';
import { DatePickerComponent } from './datepicker/index';
import {
  DropdownComponent,
  DropdownTriggerDirective,
  DropdownMenuComponent,
  DropdownItemComponent,
} from './dropdown/index';
import { FileUploadComponent } from './fileupload/index';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
} from './modal/index';

import { ThemeToggleComponent } from './theme-toggle/index';
import { SkeletonComponent } from './skeleton/index';
import { ToastComponent } from './toast/index';
import { AccordionComponent } from './accordion/index';
import { TabsComponent, TabComponent } from './tabs/index';
import { TooltipDirective } from './tooltip/index';
import { BadgeComponent } from './badge/index';
import { AvatarComponent, AvatarGroupComponent } from './avatar/index';
import { ProgressBarComponent } from './progress-bar/index';
import { AlertComponent } from './alert/index';
import { CommandPaletteComponent } from './commandpalette/index';
import { SidebarComponent } from './sidebar/index';
import { NotificationCenterComponent } from './notificationcenter/index';
import { BreadcrumbComponent } from './breadcrumb/index';
import { CodeSnippetComponent } from './code-snippet.component';
import { ButtonComponent } from './button/index';

import { KpiCardComponent } from './kpi-card.component';
import { ChartComponent } from './chart.component';
import {
  DashboardWidgetComponent,
  DashboardWidgetGridComponent,
} from './dashboard-widget.component';
import {
  ActivityTimelineComponent,
  ActivityTimelineItemComponent,
} from './activity-timeline.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataGridComponent,
    DatePickerComponent,
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownMenuComponent,
    DropdownItemComponent,
    FileUploadComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ThemeToggleComponent,
    SkeletonComponent,
    ToastComponent,
    AccordionComponent,
    TabsComponent,
    TabComponent,
    TooltipDirective,
    BadgeComponent,
    AlertComponent,
    AvatarComponent,
    AvatarGroupComponent,
    ProgressBarComponent,
    CommandPaletteComponent,
    SidebarComponent,
    NotificationCenterComponent,
    BreadcrumbComponent,
    CodeSnippetComponent,
    ButtonComponent,
    KpiCardComponent,
    ChartComponent,
    DashboardWidgetComponent,
    DashboardWidgetGridComponent,
    ActivityTimelineComponent,
    ActivityTimelineItemComponent,
  ],
  exports: [
    DataGridComponent,
    DatePickerComponent,
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownMenuComponent,
    DropdownItemComponent,
    FileUploadComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ThemeToggleComponent,
    SkeletonComponent,
    ToastComponent,
    AccordionComponent,
    TabsComponent,
    TabComponent,
    TooltipDirective,
    BadgeComponent,
    AlertComponent,
    AvatarComponent,
    AvatarGroupComponent,
    ProgressBarComponent,
    CommandPaletteComponent,
    SidebarComponent,
    NotificationCenterComponent,
    BreadcrumbComponent,
    CodeSnippetComponent,
    ButtonComponent,
    KpiCardComponent,
    ChartComponent,
    DashboardWidgetComponent,
    DashboardWidgetGridComponent,
    ActivityTimelineComponent,
    ActivityTimelineItemComponent,
    FormsModule,
  ],
})
export class MayvioUIModule {}
