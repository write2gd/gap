import { hideNotificationSuccess, sendNotificationSuccess } from './notification.actions';
import { notificationInitialState, NotificationState } from './notification.state';
import { Action, createReducer, on } from '@ngrx/store';

const reducer = createReducer<NotificationState>(
  notificationInitialState,
  on(sendNotificationSuccess, (state, {notification}) => ({
      ...state,
      notifications: [...state.notifications, notification]
    })
  ),
  on(hideNotificationSuccess, (state, {notifications}) => ({
      ...state,
      notifications: [...notifications]
    })
  )
);

export function notificationReducer(state: NotificationState, action: Action): NotificationState {
  return reducer(state, action);
}
