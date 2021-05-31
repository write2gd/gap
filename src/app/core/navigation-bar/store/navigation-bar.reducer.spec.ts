import { navigationBarMenuReducer} from './navigation-bar.reducer';
import { NavigationBarActions, openMenu } from './navigation-bar.actions';
import { async } from '@angular/core/testing';
import { navigationBarInitialState, NavigationBarState } from './navigation-bar.state';
import { getMenuOpen } from './navigation-bar.selectors';

describe('navigationBarMenuReducer', () => {
  const initialState: NavigationBarState = navigationBarInitialState;

  it('should return the state', () => {
    expect(navigationBarMenuReducer(initialState, {} as NavigationBarActions)).toEqual(initialState);
  });

  it('should return initial state on first select', async(() => {
    const state = navigationBarMenuReducer(initialState, openMenu({menuOpened: false}));
    expect(state.menuOpened).toEqual(initialState.menuOpened);
  }));

  it('should select openMenu', () => {
    expect(getMenuOpen(initialState)).toBe(initialState.menuOpened);
  });

  it('should set openMenu on MenuOpen', () => {
    const state = navigationBarMenuReducer(initialState, openMenu({menuOpened: true}));
    expect(state.menuOpened).toBe(true);
  });
});
