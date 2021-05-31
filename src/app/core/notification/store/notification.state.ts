import { Notification } from '@jsvs/notification';

export enum NotificationType {
  SUCCESS = 'sendSuccess',
  INFO    = 'sendInfo',
  WARNING = 'sendWarning',
  ERROR   = 'sendError'
}

export interface NotificationState {
  notifications: Notification[];
}

export const notificationInitialState: NotificationState = {
  notifications: []
};
