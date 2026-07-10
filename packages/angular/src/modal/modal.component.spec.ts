import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
} from './modal.component';

@Component({
  standalone: true,
  imports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
  template: `
    <mayvio-modal [isOpen]="isOpen" [size]="'lg'" (onClose)="handleClose()" data-testid="modal">
      <mayvio-modal-header>My Title</mayvio-modal-header>
      <mayvio-modal-body>My Body</mayvio-modal-body>
      <mayvio-modal-footer>My Footer</mayvio-modal-footer>
    </mayvio-modal>
  `,
})
class TestHostComponent {
  isOpen = true;
  closed = false;
  handleClose() {
    this.closed = true;
    this.isOpen = false;
  }
}

describe('ModalComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders correctly when open', () => {
    const modalEl = fixture.debugElement.query(By.css('.mv-modal'));
    expect(modalEl).toBeTruthy();
    expect(modalEl.nativeElement.className).toContain('mv-modal--lg');

    const headerEl = fixture.debugElement.query(By.css('.mv-modal-header'));
    expect(headerEl.nativeElement.textContent).toContain('My Title');

    const bodyEl = fixture.debugElement.query(By.css('.mv-modal-body'));
    expect(bodyEl.nativeElement.textContent).toContain('My Body');

    const footerEl = fixture.debugElement.query(By.css('.mv-modal-footer'));
    expect(footerEl.nativeElement.textContent).toContain('My Footer');
  });

  it('hides overlay when isOpen is false', async () => {
    // Instead of mutating the existing fixture, let's create a new one to avoid NG0100 in OnPush setups with vitest
    const newFixture = TestBed.createComponent(TestHostComponent);
    newFixture.componentInstance.isOpen = false;
    newFixture.detectChanges();
    await newFixture.whenStable();

    const overlay = newFixture.debugElement.query(By.css('.mv-modal-overlay'));
    expect(overlay.nativeElement.className).not.toContain('mv-modal-overlay--open');
    expect(overlay.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('calls onClose when close button in header is clicked', () => {
    const closeBtn = fixture.debugElement.query(By.css('.mv-modal-close')).nativeElement;
    closeBtn.click();
    expect(component.closed).toBe(true);
  });

  it('calls onClose when overlay is clicked', () => {
    const overlay = fixture.debugElement.query(By.css('.mv-modal-overlay')).nativeElement;
    overlay.click(); // Trigger click on overlay
    expect(component.closed).toBe(true);
  });
});
