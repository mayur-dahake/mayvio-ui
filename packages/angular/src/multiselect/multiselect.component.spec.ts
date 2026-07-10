import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multiselect.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    component.options = [
      { value: 'angular', label: 'Angular' },
      { value: 'react', label: 'React' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display placeholder when empty', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Select options...');
  });

  it('should toggle options and emit change', () => {
    let emitted: string[] | null = null;
    component.selectionChange.subscribe((val) => (emitted = val));

    component.toggleOption('angular');
    expect(component.value).toEqual(['angular']);
    expect(emitted).toEqual(['angular']);

    component.toggleOption('react');
    expect(component.value).toEqual(['angular', 'react']);
    expect(emitted).toEqual(['angular', 'react']);

    component.toggleOption('angular');
    expect(component.value).toEqual(['react']);
    expect(emitted).toEqual(['react']);
  });
});
