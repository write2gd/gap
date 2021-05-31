import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notificationsFeatureName } from './notification.actions';
import { NotificationState } from './notification.state';

export const getNotifications = (state: NotificationState) => state.notifications;

export const notificationsStateSelector = createFeatureSelector<NotificationState>(notificationsFeatureName);

export const notificationsSelector = createSelector(notificationsStateSelector, getNotifications);
