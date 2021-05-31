import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

export const getRouterState = (state: RouterReducerState) => state && state.state;

export const getRouter = createFeatureSelector<RouterReducerState>('routerReducer');

export const getRouterStateSelector = createSelector(getRouter, getRouterState);
