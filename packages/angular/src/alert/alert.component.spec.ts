import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();
  });

  it('should render with base class', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.mv-alert');
    expect(el).not.toBeNull();
  });

  it('should apply variant class', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.mv-alert--success');
    expect(el).not.toBeNull();
  });

  it('should render title when provided', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('title', 'My Alert');
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.mv-alert__title');
    expect(title?.textContent?.trim()).toBe('My Alert');
  });

  it('should not show dismiss button by default', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.mv-alert__close');
    expect(btn).toBeNull();
  });

  it('should show dismiss button when dismissible=true', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.mv-alert__close');
    expect(btn).not.toBeNull();
  });

  it('should have role="alert"', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[role="alert"]');
    expect(el).not.toBeNull();
  });
});
