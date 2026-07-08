import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { By } from '@angular/platform-browser';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

describe('BreadcrumbComponent', () => {
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let component: BreadcrumbComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items', () => {
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }, { label: 'Profile' }]);
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('.mv-breadcrumb__link'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent.trim()).toBe('Home');
    expect(links[1].nativeElement.textContent.trim()).toBe('Profile');
  });

  it('should apply active class to the last item', () => {
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }, { label: 'Profile' }]);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.mv-breadcrumb__item'));
    expect(items[1].nativeElement.classList.contains('mv-breadcrumb__item--active')).toBe(true);
    expect(items[1].nativeElement.getAttribute('aria-current')).toBe('page');
  });

  it('should apply custom separator', () => {
    fixture.componentRef.setInput('items', [{ label: 'Home', href: '/' }, { label: 'Profile' }]);
    fixture.componentRef.setInput('separator', '-');
    fixture.detectChanges();

    const separator = fixture.debugElement.query(By.css('.mv-breadcrumb__separator'));
    expect(separator.nativeElement.textContent.trim()).toBe('-');
  });
});
