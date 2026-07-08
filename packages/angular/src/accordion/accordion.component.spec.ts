import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionComponent } from './accordion.component';
import { By } from '@angular/platform-browser';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  const mockItems = [
    { id: 'item1', title: 'Item 1', content: 'Content 1' },
    { id: 'item2', title: 'Item 2', content: 'Content 2' },
    { id: 'item3', title: 'Item 3', content: 'Content 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
  });

  it('renders correctly with no expanded items by default', () => {
    component.items = mockItems;
    fixture.detectChanges();

    const trigger1 = fixture.debugElement.query(By.css('#accordion-header-item1'));
    expect(trigger1.attributes['aria-expanded']).toBe('false');

    const content1 = fixture.debugElement.query(By.css('#accordion-content-item1'));
    expect(content1.properties['hidden']).toBe(true);
  });

  it('respects defaultExpandedIds', () => {
    component.items = mockItems;
    component.defaultExpandedIds = ['item2'];
    fixture.detectChanges();

    const trigger2 = fixture.debugElement.query(By.css('#accordion-header-item2'));
    expect(trigger2.attributes['aria-expanded']).toBe('true');

    const content2 = fixture.debugElement.query(By.css('#accordion-content-item2'));
    expect(content2.properties['hidden']).toBe(false);
  });

  it('toggles item on click', () => {
    component.items = mockItems;
    fixture.detectChanges();

    const trigger1 = fixture.debugElement.query(By.css('#accordion-header-item1'));

    // Expand
    trigger1.nativeElement.click();
    fixture.detectChanges();
    expect(trigger1.attributes['aria-expanded']).toBe('true');

    // Collapse
    trigger1.nativeElement.click();
    fixture.detectChanges();
    expect(trigger1.attributes['aria-expanded']).toBe('false');
  });

  it('closes other items when allowMultiple is false', () => {
    component.items = mockItems;
    component.defaultExpandedIds = ['item1'];
    fixture.detectChanges();

    const trigger1 = fixture.debugElement.query(By.css('#accordion-header-item1'));
    const trigger2 = fixture.debugElement.query(By.css('#accordion-header-item2'));

    trigger2.nativeElement.click();
    fixture.detectChanges();

    expect(trigger1.attributes['aria-expanded']).toBe('false');
    expect(trigger2.attributes['aria-expanded']).toBe('true');
  });

  it('allows multiple expanded items when allowMultiple is true', () => {
    component.items = mockItems;
    component.allowMultiple = true;
    component.defaultExpandedIds = ['item1'];
    fixture.detectChanges();

    const trigger1 = fixture.debugElement.query(By.css('#accordion-header-item1'));
    const trigger2 = fixture.debugElement.query(By.css('#accordion-header-item2'));

    trigger2.nativeElement.click();
    fixture.detectChanges();

    expect(trigger1.attributes['aria-expanded']).toBe('true');
    expect(trigger2.attributes['aria-expanded']).toBe('true');
  });

  it('does not toggle if disabled', () => {
    component.items = mockItems;
    fixture.detectChanges();

    const trigger3 = fixture.debugElement.query(By.css('#accordion-header-item3'));
    trigger3.nativeElement.click();
    fixture.detectChanges();

    expect(trigger3.attributes['aria-expanded']).toBe('false');
  });

  it('emits expandedChange when toggled', () => {
    component.items = mockItems;
    fixture.detectChanges();

    let emitted: string[] | undefined;
    component.expandedChange.subscribe((ids) => {
      emitted = ids;
    });

    const trigger2 = fixture.debugElement.query(By.css('#accordion-header-item2'));
    trigger2.nativeElement.click();

    expect(emitted).toEqual(['item2']);
  });
});
