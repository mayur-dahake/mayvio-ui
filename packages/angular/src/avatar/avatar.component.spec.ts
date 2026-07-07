import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { AvatarComponent, AvatarGroupComponent } from './avatar.component';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

// ── AvatarComponent ──────────────────────────────

describe('AvatarComponent', () => {
  let fixture: ComponentFixture<AvatarComponent>;
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mv-avatar class', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar');
    expect(el).not.toBeNull();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar--lg');
    expect(el).not.toBeNull();
  });

  it('should apply default size md', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar--md');
    expect(el).not.toBeNull();
  });

  it('should apply square modifier', () => {
    fixture.componentRef.setInput('shape', 'square');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar--square');
    expect(el).not.toBeNull();
  });

  it('should apply status class', () => {
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar--online');
    expect(el).not.toBeNull();
  });

  it('should render img when src provided', () => {
    fixture.componentRef.setInput('src', 'https://example.com/avatar.jpg');
    fixture.componentRef.setInput('alt', 'Test user');
    fixture.detectChanges();
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
    expect(img?.getAttribute('alt')).toBe('Test user');
  });

  it('should render initials when no src', () => {
    fixture.componentRef.setInput('initials', 'AB');
    fixture.detectChanges();
    const span: HTMLElement | null = fixture.nativeElement.querySelector('.mv-avatar__initials');
    expect(span?.textContent?.trim()).toBe('AB');
  });
});

// ── AvatarGroupComponent ────────────────────────

describe('AvatarGroupComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarGroupComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AvatarGroupComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have mv-avatar-group class', async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarGroupComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AvatarGroupComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement.querySelector('.mv-avatar-group');
    expect(el).not.toBeNull();
  });
});
