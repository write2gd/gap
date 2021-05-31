import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGridComponent } from './items-grid.component';

describe('ItemsGridComponent', () => {
  let component: ItemsGridComponent;
  let fixture: ComponentFixture<ItemsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsGridComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(ItemsGridComponent, '')
      .createComponent(ItemsGridComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#toggleRowExpanded should set right value to expandedRowIndex property', () => {
    component.toggleRowExpanded(0);
    expect(component.expandedRowIndex).toEqual(0);

    component.toggleRowExpanded(0);
    expect(component.expandedRowIndex).toEqual(null);
  });
});
