import '@angular/compiler';
import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch {
  // already initialized
}

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let component: ToastComponent;
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [ToastService],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create empty initially', () => {
    expect(component).toBeTruthy();
    const container = fixture.nativeElement.querySelector('.mv-toast-container');
    expect(container).toBeTruthy();
    const toasts = fixture.nativeElement.querySelectorAll('.mv-toast');
    expect(toasts.length).toBe(0);
  });

  it('should render toasts dynamically using ToastService', async () => {
    service.success('Saved successfully!', 'Success', 100);
    fixture.detectChanges();

    const toastEl = fixture.nativeElement.querySelector('.mv-toast');
    expect(toastEl).toBeTruthy();
    expect(toastEl.classList.contains('mv-toast--success')).toBe(true);

    const titleEl = fixture.nativeElement.querySelector('.mv-toast__title');
    expect(titleEl.textContent.trim()).toBe('Success');

    // Wait for duration to pass
    await new Promise((resolve) => setTimeout(resolve, 110));
    fixture.detectChanges();

    const toasts = fixture.nativeElement.querySelectorAll('.mv-toast');
    expect(toasts.length).toBe(0);
  });
});
