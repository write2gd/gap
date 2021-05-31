import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavigationBarState } from './navigation-bar.state';
import { navigationBarFeatureName } from './navigation-bar.actions';

export const getMenuOpen = (state: NavigationBarState) => state.menuOpened;

const menuStateSelector = createFeatureSelector<NavigationBarState>(navigationBarFeatureName);

export const menuOpenSelector = createSelector(menuStateSelector, getMenuOpen);
