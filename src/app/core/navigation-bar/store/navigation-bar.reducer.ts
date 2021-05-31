import { openMenu } from './navigation-bar.actions';
import { navigationBarInitialState, NavigationBarState } from './navigation-bar.state';
import { Action, createReducer, on } from '@ngrx/store';

const reducer = createReducer<NavigationBarState>(
  navigationBarInitialState,
  on(openMenu, (state, {menuOpened}) => ({...state, menuOpened}))
);

export function navigationBarMenuReducer(state: NavigationBarState, action: Action): NavigationBarState {
  return reducer(state, action);
}
