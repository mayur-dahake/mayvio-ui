import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterComponent } from './notificationcenter.component';

describe('NotificationCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCenterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trigger', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.mv-notification-trigger')).toBeTruthy();
  });

  it('should render badge if unread notifications exist', () => {
    fixture.componentRef.setInput('notifications', [{ id: '1', title: 'Test', unread: true }]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.mv-notification-badge')).toBeTruthy();
    expect(el.querySelector('.mv-notification-badge')?.textContent).toContain('1');
  });

  it('should toggle popup when trigger is clicked', () => {
    const trigger = fixture.nativeElement.querySelector('.mv-notification-trigger');
    trigger.click();
    fixture.detectChanges();

    expect(component.isOpen).toBe(true);
    const popup = fixture.nativeElement.querySelector('.mv-notification-popup');
    expect(popup).toBeTruthy();
  });
});
