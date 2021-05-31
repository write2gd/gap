import { createAction, props, union } from '@ngrx/store';
import { Notification } from '@jsvs/notification';
import { Observable } from 'rxjs';

export const notificationsFeatureName: string = 'notifications';

export const sendNotification = createAction(
  `[${notificationsFeatureName}] Send notification request`,
  props<{ notification: Notification }>()
);

export const sendNotificationSuccess = createAction(
  `[${notificationsFeatureName}] Send notification success`,
  props<{ notification: Notification }>()
);

export const hideNotification = createAction(
  `[${notificationsFeatureName}] Hide notification request`,
  props<{ notification: Notification }>()
);

export const hideNotificationSuccess = createAction(
  `[${notificationsFeatureName}] Hide notification success`,
  props<{ notifications: Notification[] }>()
);

export type SendNotificationAction = Observable<ReturnType<typeof sendNotification>>;
export type SendNotificationSuccessAction = Observable<ReturnType<typeof sendNotificationSuccess>>;
export type HideNotificationSuccessAction = Observable<ReturnType<typeof hideNotificationSuccess>>;

const allActions = union({sendNotification, sendNotificationSuccess, hideNotification, hideNotificationSuccess});
export type NotificationActions = typeof allActions;
