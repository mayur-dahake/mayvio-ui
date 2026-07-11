import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaComponent } from './textarea.component';
import { By } from '@angular/platform-browser';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply error state', () => {
    fixture.componentRef.setInput('error', true);
    fixture.detectChanges();
    const textareaEl = fixture.debugElement.query(By.css('textarea'));
    expect(textareaEl.classes['mv-textarea--error']).toBe(true);
    expect(textareaEl.attributes['aria-invalid']).toBe('true');
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const textareaEl = fixture.debugElement.query(By.css('textarea'));
    expect(textareaEl.nativeElement.disabled).toBe(true);
  });
});
