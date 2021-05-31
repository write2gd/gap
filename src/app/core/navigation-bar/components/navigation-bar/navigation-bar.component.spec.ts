import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { of, Subject } from 'rxjs';
import { QueryList } from '@angular/core';
import { NavigationBarMenuItemComponent } from '../navigation-bar-menu-item/navigation-bar-menu-item.component';
import { mockQueryList } from '../../../../../tests/mocked-services';

describe('NavigationBarComponent', () => {

  let component: NavigationBarComponent,
      fixture: ComponentFixture<NavigationBarComponent>;

  const clickSubject = new Subject();

  const menuItems = mockQueryList([
    { onClickCollapse: true, clickEmitter: clickSubject } as NavigationBarMenuItemComponent,
    { onClickCollapse: false, clickEmitter: clickSubject } as NavigationBarMenuItemComponent
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationBarComponent
      ]
    });

    fixture = TestBed
      .overrideTemplate(NavigationBarComponent, '')
      .createComponent(NavigationBarComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.menuOpenChange, 'emit');
  }));

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize component', async(() => {
    expect(component.menuOpenChange).toBeDefined();
    expect(component.ngAfterContentInit).toBeDefined();
    expect(component.toggleMenu).toBeDefined();
    expect(component.closeMenu).toBeDefined();
  }));

  it('should emit menuOpenChange on toggle with inverted value', () => {
    component.menuOpen = true;
    component.toggleMenu();
    expect(component.menuOpenChange.emit).toHaveBeenCalledWith(false);
  });

  it('should emit menuOpenChange on close with false', () => {
    component.closeMenu();
    expect(component.menuOpenChange.emit).toHaveBeenCalledWith(false);
  });

  it('should listen for menu items clicks if onClickClose and call closeMenu', async(() => {
    spyOn(component, 'closeMenu');
    component.menuItems = { changes: of(menuItems) } as QueryList<NavigationBarMenuItemComponent>;
    component.ngAfterContentInit();
    clickSubject.next();
    expect(component.closeMenu).toHaveBeenCalledTimes(1);
  }));
});
