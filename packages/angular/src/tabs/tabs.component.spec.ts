import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { TabsComponent, TabComponent } from './tabs.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

@Component({
  standalone: true,
  imports: [TabsComponent, TabComponent],
  template: `
    <mv-tabs>
      <mv-tab label="Tab 1" id="tab1">Content 1</mv-tab>
      <mv-tab label="Tab 2" id="tab2">Content 2</mv-tab>
      <mv-tab label="Tab 3" id="tab3" [disabled]="true">Content 3</mv-tab>
    </mv-tabs>
  `,
})
class TestHostComponent {}

describe('TabsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render tabs and set the first one as active', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.mv-tabs__tab'));
    expect(tabs.length).toBe(3);

    expect(tabs[0].nativeElement.textContent.trim()).toBe('Tab 1');
    expect(tabs[0].nativeElement.classList.contains('mv-tabs__tab--active')).toBe(true);

    const panels = fixture.debugElement.queryAll(By.css('.mv-tabs__panel'));
    expect(panels[0].nativeElement.hidden).toBe(false);
    expect(panels[1].nativeElement.hidden).toBe(true);
  });

  it('should change active tab when a tab is clicked', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.mv-tabs__tab'));
    tabs[1].nativeElement.click();
    fixture.detectChanges();

    expect(tabs[0].nativeElement.classList.contains('mv-tabs__tab--active')).toBe(false);
    expect(tabs[1].nativeElement.classList.contains('mv-tabs__tab--active')).toBe(true);

    const panels = fixture.debugElement.queryAll(By.css('.mv-tabs__panel'));
    expect(panels[0].nativeElement.hidden).toBe(true);
    expect(panels[1].nativeElement.hidden).toBe(false);
  });

  it('should not change to a disabled tab on click', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.mv-tabs__tab'));
    tabs[2].nativeElement.click(); // Tab 3 is disabled
    fixture.detectChanges();

    expect(tabs[0].nativeElement.classList.contains('mv-tabs__tab--active')).toBe(true);
    expect(tabs[2].nativeElement.classList.contains('mv-tabs__tab--active')).toBe(false);
  });
});
