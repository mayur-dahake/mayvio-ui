import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  DropdownComponent,
  DropdownTriggerDirective,
  DropdownMenuComponent,
  DropdownItemComponent,
} from './dropdown.component';

@Component({
  standalone: true,
  imports: [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownMenuComponent,
    DropdownItemComponent,
  ],
  template: `
    <mayvio-dropdown [align]="align" data-testid="dropdown">
      <button mvDropdownTrigger data-testid="trigger">Options</button>
      <mayvio-dropdown-menu data-testid="menu">
        <mayvio-dropdown-item data-testid="item1" (itemClick)="lastClicked = 'item1'"
          >Item 1</mayvio-dropdown-item
        >
        <mayvio-dropdown-item data-testid="item2" [disabled]="true"
          >Item 2 (disabled)</mayvio-dropdown-item
        >
      </mayvio-dropdown-menu>
    </mayvio-dropdown>
  `,
})
class TestHostComponent {
  align: 'left' | 'right' | 'center' = 'left';
  lastClicked = '';
}

describe('DropdownComponent', () => {
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

  it('menu is closed by default', () => {
    const menu = fixture.debugElement.query(By.css('.mv-dropdown-menu'));
    expect(menu.nativeElement.className).not.toContain('mv-dropdown-menu--open');
  });

  it('opens menu when trigger is clicked', () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    const menu = fixture.debugElement.query(By.css('.mv-dropdown-menu'));
    expect(menu.nativeElement.className).toContain('mv-dropdown-menu--open');
  });

  it('closes menu when trigger is clicked again', () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]')).nativeElement;

    trigger.click();
    fixture.detectChanges();

    trigger.click();
    fixture.detectChanges();

    const menu = fixture.debugElement.query(By.css('.mv-dropdown-menu'));
    expect(menu.nativeElement.className).not.toContain('mv-dropdown-menu--open');
  });

  it('closes menu and emits itemClick when an item is clicked', () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]')).nativeElement;
    trigger.click();
    fixture.detectChanges();

    // DropdownItemComponent renders a <button> inside itself — click the inner button
    const item1Host = fixture.debugElement.query(By.css('[data-testid="item1"]')).nativeElement;
    const item1Btn = item1Host.querySelector('button') as HTMLButtonElement;
    item1Btn.click();
    fixture.detectChanges();

    expect(component.lastClicked).toBe('item1');
    const menu = fixture.debugElement.query(By.css('.mv-dropdown-menu'));
    expect(menu.nativeElement.className).not.toContain('mv-dropdown-menu--open');
  });

  it('applies align class to menu', () => {
    // Create a fresh fixture with align=right to avoid NG0100
    const newFixture = TestBed.createComponent(TestHostComponent);
    newFixture.componentInstance.align = 'right';
    newFixture.detectChanges();

    const menu = newFixture.debugElement.query(By.css('.mv-dropdown-menu'));
    expect(menu.nativeElement.className).toContain('mv-dropdown-menu--right');
  });
});
