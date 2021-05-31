import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  tryLoginFailed,
  tryLogin,
  login,
  logout,
  LoginAction,
  LogoutAction,
  loginSuccess,
  AuthFailedAction,
  authFailed,
  TryLoginAction,
  LoginSuccessAction
} from './security.actions';
import { of, iif } from 'rxjs';
import { JsvsSecurityService, JsvsUserService, JsvsTokenService } from '@jsvs/security';
import { LocationRefService, WindowRefService } from '@jsvs/globals';
import { map, mergeMap, tap } from 'rxjs/operators';
import { oauthConfig } from '../oauth.config';
import { sendNotification, SendNotificationAction } from '../../notification/store/notification.actions';
import { JsvsTranslationService } from '@jsvs/translation';
import { NotificationType } from '../../notification/store/notification.state';

@Injectable()
export class SecurityEffects {

  tryLoginRequest$ = createEffect(this.tryLoginRequest.bind(this) as () => TryLoginAction);
  loginRequest$ = createEffect(this.loginRequest.bind(this) as () => LoginAction, {dispatch: false});
  loginSuccess$ = createEffect(this.loginSuccess.bind(this) as () => SendNotificationAction);
  logout$ = createEffect(this.logout.bind(this) as () => LogoutAction, {dispatch: false});
  authInterceptorError$ = createEffect(this.authInterceptorError.bind(this) as () => AuthFailedAction, {dispatch: false});

  constructor(private actions$: Actions,
              private securityService: JsvsSecurityService,
              private userService: JsvsUserService,
              private tokenService: JsvsTokenService,
              private translate: JsvsTranslationService,
              private locationRef: LocationRefService,
              private windowRef: WindowRefService) {
  }

  private tryLoginRequest(): TryLoginAction | LoginSuccessAction {
    return this.actions$.pipe(
      ofType(tryLogin),
      mergeMap(() => this.securityService.tryLogin()),
      map(() => ({
        currentUser: this.userService.getCurrentUser(),
        token: this.tokenService.getToken()
      })),
      mergeMap(({currentUser, token}) => iif(
        () => this.userService.isAuthenticated(),
        of(loginSuccess({currentUser, token})),
        of(tryLoginFailed())
        )
      )
    );
  }

  private loginRequest(): LoginAction {
    return this.actions$.pipe(
      ofType(login),
      tap(() => this.securityService.login())
    );
  }

  private loginSuccess(): SendNotificationAction {
    return this.actions$.pipe(
      ofType(loginSuccess),
      map(action => action.currentUser),
      map(currentUser => sendNotification({
        notification: {
          message: this.translate.instant('SECURITY.USER_LOGGED_IN_MESSAGE', {user: currentUser}),
          title: this.translate.instant('SECURITY.USER_LOGGED_IN_TITLE'),
          notificationType: NotificationType.INFO
        }
      }))
    );
  }

  private logout(): LogoutAction {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => this.windowRef.nativeWindow.indexedDB.deleteDatabase('pos-angular')),
      tap(() => this.securityService.logout(true)),
      tap(() => this.locationRef.nativeLocation.assign(oauthConfig.logoutUrl))
    );
  }

  private authInterceptorError(): AuthFailedAction {
    return this.actions$.pipe(
      ofType(authFailed),
      tap(() => this.securityService.redirectToHomePage())
    );
  }
}
