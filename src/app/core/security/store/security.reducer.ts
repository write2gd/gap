import { loginSuccess, tryLoginFailed } from './security.actions';
import { securityInitialState, SecurityState } from './security.state';
import { Action, createReducer, on } from '@ngrx/store';

const reducer = createReducer<SecurityState>(
  securityInitialState,
  on(loginSuccess, (state, {currentUser}) => ({
      ...state,
      currentUser
    })
  ),
  on(tryLoginFailed, state => ({
      ...state,
      currentUser: null
    })
  )
);

export function securityReducer(state: SecurityState, action: Action): SecurityState {
  return reducer(state, action);
}
