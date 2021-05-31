import { createAction, props, union } from '@ngrx/store';
import { User } from '@jsvs/security';
import { Observable } from 'rxjs';

export const securityFeatureName: string = 'security';

export const tryLogin = createAction(`[${securityFeatureName}] Try Login request`);
export const tryLoginFailed = createAction(`[${securityFeatureName}] Try login failed`);
export const login = createAction(`[${securityFeatureName}] Login request`);
export const loginSuccess = createAction(
  `[${securityFeatureName}] Login Success`,
  props<{ currentUser: User, token: string }>()
);
export const logout = createAction(`[${securityFeatureName}] Logout`);
export const authFailed = createAction(`[${securityFeatureName}] Authentication Failed`);

export type TryLoginAction = Observable<ReturnType<typeof tryLoginFailed | typeof loginSuccess>>;
export type LoginAction = Observable<ReturnType<typeof login>>;
export type LoginSuccessAction = Observable<ReturnType<typeof loginSuccess>>;
export type LogoutAction = Observable<ReturnType<typeof logout>>;
export type AuthFailedAction = Observable<ReturnType<typeof authFailed>>;

const allActions = union({tryLogin, tryLoginFailed, login, loginSuccess, logout, authFailed});
export type SecurityActions = typeof allActions;



