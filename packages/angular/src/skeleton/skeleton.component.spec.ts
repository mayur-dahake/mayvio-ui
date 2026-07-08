import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { SkeletonComponent } from './skeleton.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

describe('SkeletonComponent', () => {
  let fixture: ComponentFixture<SkeletonComponent>;
  let component: SkeletonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply base class mv-skeleton', () => {
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('mv-skeleton')).toBe(true);
    expect(el.classList.contains('mv-skeleton--text')).toBe(true);
  });

  it('should apply variant modifiers', () => {
    fixture.componentRef.setInput('variant', 'circle');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('mv-skeleton--circle')).toBe(true);
  });

  it('should apply animation classes', () => {
    fixture.componentRef.setInput('animation', 'pulse');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.classList.contains('mv-skeleton--pulse')).toBe(true);
  });

  it('should apply inline width and height styles', () => {
    fixture.componentRef.setInput('width', '250px');
    fixture.componentRef.setInput('height', '50px');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('div');
    expect(el.style.width).toBe('250px');
    expect(el.style.height).toBe('50px');
  });
});
