export * from './data-grid.component';
export * from './date-picker.component';
export * from './dropdown.component';
export * from './file-upload.component';
export * from './modal.directive';
export * from './multi-select.component';

export * from './theme-toggle.component';
export * from './skeleton.component';
export * from './toast.service';
export * from './toast.component';
export * from './accordion.component';
export * from './tabs.component';
export * from './tooltip/index';
export * from './badge/index';
export * from './avatar/index';
export * from './progress-bar.component';
export * from './alert/index';
export * from './command-palette.component';
export * from './sidebar.component';
export * from './notification-center.component';
export * from './breadcrumb.component';
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
import { DropdownComponent } from './dropdown.component';
import { FileUploadComponent } from './file-upload.component';
import { ModalTargetDirective } from './modal.directive';
import { MultiSelectComponent } from './multi-select.component';

import { ThemeToggleComponent } from './theme-toggle.component';
import { SkeletonComponent } from './skeleton.component';
import { ToastComponent } from './toast.component';
import { AccordionComponent, AccordionItemComponent } from './accordion.component';
import { TabsComponent, TabPanelComponent } from './tabs.component';
import { TooltipDirective } from './tooltip/index';
import { BadgeComponent } from './badge/index';
import { AvatarComponent, AvatarGroupComponent } from './avatar/index';
import { ProgressBarComponent } from './progress-bar.component';
import { AlertComponent } from './alert/index';
import { CommandPaletteComponent } from './command-palette.component';
import { SidebarComponent, SidebarLinkComponent } from './sidebar.component';
import {
  NotificationCenterComponent,
  NotificationItemComponent,
} from './notification-center.component';
import { BreadcrumbComponent } from './breadcrumb.component';
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
    FileUploadComponent,
    ModalTargetDirective,
    MultiSelectComponent,
    ThemeToggleComponent,
    SkeletonComponent,
    ToastComponent,
    AccordionComponent,
    AccordionItemComponent,
    TabsComponent,
    TabPanelComponent,
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
    FileUploadComponent,
    ModalTargetDirective,
    MultiSelectComponent,
    ThemeToggleComponent,
    SkeletonComponent,
    ToastComponent,
    AccordionComponent,
    AccordionItemComponent,
    TabsComponent,
    TabPanelComponent,
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
