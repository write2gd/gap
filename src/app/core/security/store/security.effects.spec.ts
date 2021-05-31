import { async, inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { mockService } from '../../../../tests/mocked-services';
import { SecurityEffects } from './security.effects';
import { SecurityActions, loginSuccess, tryLogin, tryLoginFailed, login, logout, authFailed } from './security.actions';
import { JsvsUserService, JsvsTokenService, JsvsSecurityService, User } from '@jsvs/security';
import { LocationRefService, WindowRefService } from '@jsvs/globals';
import { JsvsTranslationService } from '@jsvs/translation';
import { sendNotification } from '../../notification/store/notification.actions';
import { NotificationType } from '../../notification/store/notification.state';


describe('SecurityEffects', () => {

  let effects: SecurityEffects,
    actions: ReplaySubject<SecurityActions>,
    userService: jasmine.SpyObj<JsvsUserService>,
    tokenService: jasmine.SpyObj<JsvsTokenService>,
    translate: jasmine.SpyObj<JsvsTranslationService>,
    securityService: jasmine.SpyObj<JsvsSecurityService>;

  const testUser: User = {
      city: '',
      client_id: 'a123',
      email: '',
      exp: 0,
      firstName: '',
      lastName: '',
      memberOf: '',
      scope: [],
      userName: '',
      username: '',
      country: ''
    },
    testToken = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityEffects,
        provideMockActions(() => actions),
        {provide: JsvsSecurityService, useValue: mockService(JsvsSecurityService)},
        {provide: JsvsUserService, useValue: mockService(JsvsUserService)},
        {provide: JsvsTokenService, useValue: mockService(JsvsTokenService)},
        {provide: JsvsTranslationService, useValue: mockService(JsvsTranslationService)},
        {provide: LocationRefService, useValue: {nativeLocation: {assign: jasmine.createSpy('assign')}}},
        {provide: WindowRefService, useValue: {nativeWindow: {indexedDB: { deleteDatabase: jasmine.createSpy('indexedDB')}}}}
      ]
    });

    effects = TestBed.get(SecurityEffects);
    userService = TestBed.get(JsvsUserService);
    tokenService = TestBed.get(JsvsTokenService);
    securityService = TestBed.get(JsvsSecurityService);
    translate = TestBed.get(JsvsTranslationService);
    translate.instant.and.returnValue('');
  }));

  it('should catch tryLogin and dispatch TryLoginFailed if user is not logged in', async(() => {
    (securityService.tryLogin as jasmine.Spy).and.returnValue(of(''));
    (userService.isAuthenticated as jasmine.Spy).and.returnValue(false);
    actions = new ReplaySubject(1);
    actions.next(tryLogin());
    effects.tryLoginRequest$.subscribe(result => {
      expect(securityService.tryLogin).toHaveBeenCalled();
      expect(result).toEqual(tryLoginFailed());
    });
  }));

  it('should catch tryLogin and dispatch LoginSuccess if user is logged in', async(() => {
    (securityService.tryLogin as jasmine.Spy).and.returnValue(of(''));
    userService.getCurrentUser.and.returnValue(testUser);
    tokenService.getToken.and.returnValue(testToken);
    (userService.isAuthenticated as jasmine.Spy).and.returnValue(true);
    actions = new ReplaySubject(1);
    actions.next(tryLogin());
    effects.tryLoginRequest$.subscribe(result => {
      expect(securityService.tryLogin).toHaveBeenCalled();
      expect(result).toEqual(loginSuccess({currentUser: testUser, token: testToken}));
    });
  }));

  it('should catch login and dispatch LoginSuccess', async(() => {
    userService.getCurrentUser.and.returnValue(testUser);
    actions = new ReplaySubject(1);
    actions.next(login());
    effects.loginRequest$.subscribe(() => {
      expect(securityService.login).toHaveBeenCalled();
    });
  }));

  it('should catch login and dispatch LoginSuccess', async(() => {
    actions = new ReplaySubject(1);
    actions.next(loginSuccess({currentUser: testUser, token: ''}));
    effects.loginSuccess$.subscribe(result => {
      expect(result).toEqual(sendNotification({
        notification: {
          message: '',
          notificationType: NotificationType.INFO,
          title: ''
        }
      }));
    });
  }));

  it('should catch logout', inject([LocationRefService, WindowRefService],
    (locationRef: LocationRefService, windowRef: WindowRefService) => {
      actions = new ReplaySubject(1);
      actions.next(logout());
      effects.logout$.subscribe(() => {
        expect(windowRef.nativeWindow.indexedDB.deleteDatabase).toHaveBeenCalled();
        expect(securityService.logout).toHaveBeenCalled();
        expect(locationRef.nativeLocation.assign).toHaveBeenCalled();
      });
    }));

  it('should catch and dispatch AuthError', async(() => {
    actions = new ReplaySubject(1);
    actions.next(authFailed());
    effects.authInterceptorError$.subscribe(() => {
      expect(securityService.redirectToHomePage).toHaveBeenCalled();
    });
  }));

});
