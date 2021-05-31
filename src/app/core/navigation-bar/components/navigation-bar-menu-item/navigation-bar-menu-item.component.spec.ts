import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarMenuItemComponent } from './navigation-bar-menu-item.component';

describe('NavigationBarMenuItemComponent', () => {
  let component: NavigationBarMenuItemComponent;
  let fixture: ComponentFixture<NavigationBarMenuItemComponent>;
  let event: jasmine.SpyObj<Event>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBarMenuItemComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(NavigationBarMenuItemComponent, '')
      .createComponent(NavigationBarMenuItemComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    event = jasmine.createSpyObj('event', ['preventDefault']);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent default when onClick called', () => {
    component.onClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should emit clickEmitter the value of onClickCollapse when onClick called', () => {
    spyOn(component.clickEmitter, 'emit');
    component.onClick(event);
    expect(component.clickEmitter.emit).toHaveBeenCalledWith(true);
  });
});
