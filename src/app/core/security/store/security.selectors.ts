import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState } from './security.state';
import { securityFeatureName } from './security.actions';

export const getCurrentUser = (state: SecurityState) => state.currentUser;

const securityStateSelector = createFeatureSelector<SecurityState>(securityFeatureName);

export const currentUserSelector = createSelector(securityStateSelector, getCurrentUser);
