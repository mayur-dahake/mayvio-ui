import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPaletteComponent } from './commandpalette.component';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render anything if not open', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.mv-commandpalette')).toBeNull();
  });

  it('should render commands when open', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('commands', [
      { id: '1', label: 'Create User', group: 'Actions' },
    ]);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.mv-commandpalette')).toBeTruthy();
    expect(el.textContent).toContain('Create User');
    expect(el.textContent).toContain('Actions');
  });
});
