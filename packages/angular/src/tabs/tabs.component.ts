import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

let nextId = 0;

@Component({
  selector: 'mv-tab',
  standalone: true,
  template: `
    <div
      role="tabpanel"
      [attr.id]="'mv-tab-panel-' + id"
      [attr.aria-labelledby]="'mv-tab-' + id"
      class="mv-tabs__panel"
      [class.mv-tabs__panel--hidden]="!active"
      [hidden]="!active"
    >
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() label: string = '';
  @Input() id: string = `tab-${nextId++}`;
  @Input() disabled: boolean = false;

  active: boolean = false;

  public cdr = inject(ChangeDetectorRef);
}

@Component({
  selector: 'mv-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mv-tabs" [class]="hostClass">
      <div class="mv-tabs__list" role="tablist">
        <button
          *ngFor="let tab of tabs"
          type="button"
          role="tab"
          [attr.id]="'mv-tab-' + tab.id"
          [attr.aria-selected]="tab.active"
          [attr.aria-controls]="'mv-tab-panel-' + tab.id"
          class="mv-tabs__tab"
          [class.mv-tabs__tab--active]="tab.active"
          [class.mv-tabs__tab--disabled]="tab.disabled"
          [disabled]="tab.disabled"
          (click)="selectTab(tab)"
        >
          {{ tab.label }}
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit, OnDestroy {
  @Input() activeId?: string;
  @Input() hostClass = '';

  @Output() activeIdChange = new EventEmitter<string>();

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);

  ngAfterContentInit(): void {
    this.tabs.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateActiveTab();
    });
    this.updateActiveTab();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(): void {
    if (this.tabs) {
      this.updateActiveTab();
    }
  }

  selectTab(tab: TabComponent): void {
    if (tab.disabled || tab.active) {
      return;
    }

    this.tabs.toArray().forEach((t) => {
      t.active = false;
      t.cdr.markForCheck();
    });

    tab.active = true;
    tab.cdr.markForCheck();

    this.activeIdChange.emit(tab.id);
  }

  private updateActiveTab(): void {
    const tabsArray = this.tabs.toArray();
    if (!tabsArray.length) return;

    let tabToActivate = tabsArray.find((t) => t.id === this.activeId);

    // If no activeId is provided or found, activate the first non-disabled tab
    if (!tabToActivate) {
      const activeTab = tabsArray.find((t) => t.active);
      if (activeTab) {
        tabToActivate = activeTab;
      } else {
        tabToActivate = tabsArray.find((t) => !t.disabled);
      }
    }

    if (tabToActivate) {
      this.selectTab(tabToActivate);
    }
  }
}
