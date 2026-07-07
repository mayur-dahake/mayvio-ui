import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { ButtonComponent } from './button.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply base class mv-button', () => {
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mv-button')).toBe(true);
  });

  it('should apply variant class modifier', () => {
    fixture.componentRef.setInput('variant', 'outline');
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mv-button--outline')).toBe(true);
  });

  it('should apply size class modifier', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mv-button--lg')).toBe(true);
  });

  it('should apply color class modifier', () => {
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mv-button--success')).toBe(true);
  });

  it('should apply shape modifier', () => {
    fixture.componentRef.setInput('shape', 'round');
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('mv-button--round')).toBe(true);
  });

  it('should set disabled attribute', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.disabled).toBe(true);
  });
});
