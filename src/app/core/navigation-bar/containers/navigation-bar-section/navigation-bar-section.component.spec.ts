import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarSectionComponent } from './navigation-bar-section.component';
import { login, logout } from '../../../security/store/security.actions';
import { mockService } from '../../../../../tests/mocked-services';
import { Store } from '@ngrx/store';
import { JsvsUserService } from '@jsvs/security';
import { TestStore } from '../../../../../tests/test.store';
import { openMenu } from '../../store/navigation-bar.actions';

describe('NavigationBarSectionComponent', () => {
  let component: NavigationBarSectionComponent,
      store: TestStore,
      fixture: ComponentFixture<NavigationBarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarSectionComponent],
      providers: [
        {provide: Store, useClass: TestStore},
        {provide: JsvsUserService, useValue: mockService(JsvsUserService)}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideTemplate(NavigationBarSectionComponent, '')
      .createComponent(NavigationBarSectionComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get the page title from route settings', async(() => {
    store.setState({url: '/test', root: { firstChild: {data: {mobileTitle: 'MENU.TEST'}}}});
    component.ngOnInit();
    component.mobileTitle$.subscribe(title => {
      expect(title).toBe('MENU.TEST');
    });
  }));

  it('should get the default page title if none is present in route settings', async(() => {
    store.setState({url: '/test'});
    component.ngOnInit();
    component.mobileTitle$.subscribe(title => {
      expect(title).toBe('MENU.HOME');
    });
  }));

  it('should get authentication status from user service', () => {
    component.isAuthenticated();
    expect(component['userService'].isAuthenticated).toHaveBeenCalled();
  });

  it('should dispatch Login Action when login called', () => {
    component.login();
    expect(store.dispatch).toHaveBeenCalledWith(login());
  });

  it('should dispatch Logout Action when logout called', () => {
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  it('should dispatch MenuOpen Action when menuOpenChange called', () => {
    component.menuOpenChange(true);
    expect(store.dispatch).toHaveBeenCalledWith(openMenu({menuOpened: true}));
  });
});
