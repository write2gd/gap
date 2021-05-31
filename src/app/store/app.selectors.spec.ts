import { RouterReducerState } from '@ngrx/router-store';
import { getRouterState } from './app.selectors';

describe('AppSelectors', () => {

  it('should get getRouterStateSelector', () => {
    const initialState: RouterReducerState = {state: {}} as RouterReducerState;
    expect(getRouterState(initialState)).toEqual(initialState.state);
  });

});
