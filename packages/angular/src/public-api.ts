export * from './data-grid.component';
export * from './date-picker.component';
export * from './dropdown/index';
export * from './file-upload.component';
export * from './modal/index';
export * from './multi-select.component';

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
export * from './command-palette.component';
export * from './sidebar.component';
export * from './notification-center.component';
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
import { DatePickerComponent } from './date-picker.component';
import {
  DropdownComponent,
  DropdownTriggerDirective,
  DropdownMenuComponent,
  DropdownItemComponent,
} from './dropdown/index';
import { FileUploadComponent } from './file-upload.component';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
} from './modal/index';
import { MultiSelectComponent } from './multi-select.component';

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
import { CommandPaletteComponent } from './command-palette.component';
import { SidebarComponent, SidebarLinkComponent } from './sidebar.component';
import {
  NotificationCenterComponent,
  NotificationItemComponent,
} from './notification-center.component';
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
    MultiSelectComponent,
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
    SidebarLinkComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
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
    MultiSelectComponent,
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
    SidebarLinkComponent,
    NotificationCenterComponent,
    NotificationItemComponent,
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
