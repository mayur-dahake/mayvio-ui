import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchComponent } from './switch.component';
import { By } from '@angular/platform-browser';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl.nativeElement.disabled).toBe(true);
    const wrapper = fixture.debugElement.query(By.css('.mv-switch-wrapper'));
    expect(wrapper.classes['mv-switch-wrapper--disabled']).toBe(true);
  });

  it('should render label', () => {
    fixture.componentRef.setInput('label', 'Test Switch');
    fixture.detectChanges();
    const labelEl = fixture.debugElement.query(By.css('.mv-switch-label'));
    expect(labelEl.nativeElement.textContent).toBe('Test Switch');
  });
});
