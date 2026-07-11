import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply error state', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.mv-checkbox-wrapper'));
    expect(wrapper.classes['mv-checkbox-wrapper--error']).toBe(true);
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.nativeElement.disabled).toBe(true);
  });

  it('should render label', () => {
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.mv-checkbox-label'));
    expect(labelEl.nativeElement.textContent).toBe('Test Label');
  });
});
