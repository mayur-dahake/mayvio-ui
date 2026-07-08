import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { ProgressBarComponent } from './progress-bar.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

describe('ProgressBarComponent', () => {
  let fixture: ComponentFixture<ProgressBarComponent>;
  let component: ProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply BEM classes', () => {
    const el = fixture.nativeElement.querySelector('.mv-progress-bar');
    expect(el).toBeTruthy();
    expect(el.classList.contains('mv-progress-bar--md')).toBe(true);
  });

  it('should calculate fill width correctly', () => {
    fixture.componentRef.setInput('value', 30);
    fixture.componentRef.setInput('max', 100);
    fixture.detectChanges();
    const fill = fixture.nativeElement.querySelector('.mv-progress-bar__fill');
    expect(fill.style.width).toBe('30%');
  });

  it('should apply indeterminate tracker class', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    const track = fixture.nativeElement.querySelector('.mv-progress-bar__track');
    expect(track.classList.contains('mv-progress-bar__track--indeterminate')).toBe(true);
  });
});
