import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { BadgeComponent } from './badge.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // Prevent re-initialization error
}

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render standard class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.classList.contains('mv-badge')).toBe(true);
  });

  it('should apply variant classes', () => {
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.classList.contains('mv-badge--success')).toBe(true);
  });

  it('should apply size classes', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.classList.contains('mv-badge--lg')).toBe(true);
  });

  it('should apply outline class', () => {
    fixture.componentRef.setInput('outline', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.classList.contains('mv-badge--outline')).toBe(true);
  });

  it('should apply dot class', () => {
    fixture.componentRef.setInput('dot', true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.classList.contains('mv-badge--dot')).toBe(true);
  });
});
