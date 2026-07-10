import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './fileupload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label and hint', () => {
    fixture.componentRef.setInput('label', 'Upload resume');
    fixture.componentRef.setInput('hint', 'PDF only');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Upload resume');
    expect(el.textContent).toContain('PDF only');
  });
});
