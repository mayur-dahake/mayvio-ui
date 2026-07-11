import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radiogroup.component';
import { By } from '@angular/platform-browser';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    const labels = fixture.debugElement.queryAll(By.css('.mv-radio-label'));
    expect(labels.length).toBe(2);
    expect(labels[0].nativeElement.textContent).toBe('Option A');
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
    expect(inputs[0].nativeElement.disabled).toBe(true);
  });
});
