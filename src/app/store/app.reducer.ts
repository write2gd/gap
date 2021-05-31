import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  routerReducer
};