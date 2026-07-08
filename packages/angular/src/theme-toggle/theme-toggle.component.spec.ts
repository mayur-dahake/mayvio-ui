import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { By } from '@angular/platform-browser';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;

    root = document.documentElement;
    root.classList.remove('dark');
  });

  afterEach(() => {
    root.classList.remove('dark');
  });

  it('renders correctly', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('toggles dark mode class on document when clicked (uncontrolled)', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));

    expect(root.classList.contains('dark')).toBe(false);

    button.nativeElement.click();
    fixture.detectChanges();
    expect(root.classList.contains('dark')).toBe(true);

    button.nativeElement.click();
    fixture.detectChanges();
    expect(root.classList.contains('dark')).toBe(false);
  });

  it('calls themeToggled when provided (controlled)', () => {
    component.theme = 'light';

    let emitted = false;
    component.themeToggled.subscribe(() => {
      emitted = true;
    });

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(emitted).toBe(true);
    expect(root.classList.contains('dark')).toBe(false); // Class should not be toggled automatically
  });
});
