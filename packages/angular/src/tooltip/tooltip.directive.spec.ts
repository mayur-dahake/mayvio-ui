import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { TooltipDirective } from './tooltip.directive';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: ` <button [mvTooltip]="'Tooltip text'" [placement]="'bottom'">Trigger</button> `,
})
class TestHostComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply tooltip aria attribute to host element', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('should render tooltip DOM node', () => {
    const tooltipEl = document.querySelector('.mv-tooltip');
    expect(tooltipEl).toBeTruthy();
    expect(tooltipEl?.textContent?.trim()).toBe('Tooltip text');
  });

  it('should append bottom placement class', () => {
    const tooltipEl = document.querySelector('.mv-tooltip');
    expect(tooltipEl?.classList.contains('mv-tooltip--bottom')).toBe(true);
  });
});
