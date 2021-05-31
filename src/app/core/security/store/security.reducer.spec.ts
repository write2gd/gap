import { securityReducer } from './security.reducer';
import { tryLogin, loginSuccess, tryLoginFailed } from './security.actions';
import { async } from '@angular/core/testing';
import { User } from '@jsvs/security';
import { securityInitialState } from './security.state';

describe('SecurityReducer', () => {
  const testUser: User = {
      city: '',
      client_id: '',
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

  it('should return state with new user data on LoginSuccess', async(() => {
    const state = securityReducer(securityInitialState, loginSuccess({currentUser: testUser, token: testToken}));
    expect(state.currentUser).toEqual(testUser);
  }));

  it('should return state with no user data on TryLoginFailed', async(() => {
    const state = securityReducer(securityInitialState, tryLoginFailed());
    expect(state.currentUser).toEqual(null);
  }));

  it('should return state with no user data', async(() => {
    const state = securityReducer(securityInitialState, tryLogin());
    expect(state.currentUser).toEqual(securityInitialState.currentUser);
  }));

  it('should return initial state on first select', async(() => {
    const state = securityReducer(undefined, tryLogin());
    expect(state.currentUser).toEqual(securityInitialState.currentUser);
  }));
});
