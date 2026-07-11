import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply size classes correctly', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.classes['mv-input--lg']).toBe(true);
  });

  it('should apply error state', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.classes['mv-input--error']).toBe(true);
    expect(inputEl.attributes['aria-invalid']).toBe('true');
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.nativeElement.disabled).toBe(true);
  });
});
