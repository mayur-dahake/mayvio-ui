import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './datepicker.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder when empty', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Select date');
  });

  it('should format selected date', () => {
    fixture.componentRef.setInput('value', new Date(2023, 5, 15));
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('June 15, 2023');
  });
});
