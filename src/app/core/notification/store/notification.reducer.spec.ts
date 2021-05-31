import { async } from '@angular/core/testing';
import { notificationReducer } from './notification.reducer';
import { Notification } from '@jsvs/notification';
import { getNotifications } from './notification.selectors';
import { notificationInitialState, NotificationType } from './notification.state';
import { hideNotificationSuccess, sendNotification, sendNotificationSuccess } from './notification.actions';

describe('NotificationReducer', () => {

  const notification: Notification = {
    message: 'SUCCESS',
    notificationType: NotificationType.SUCCESS
  };

  it('should return initial state on first select', async(() => {
    const state = notificationReducer(undefined, sendNotification({notification}));
    expect(state.notifications).toEqual(notificationInitialState.notifications);
  }));

  it('should return state with new notification added on SendNotificationSuccess', async(() => {
    const state = notificationReducer(notificationInitialState, sendNotificationSuccess({notification}));
    expect(state.notifications).toEqual([notification]);
  }));

  it('should update notifications on HideNotificationSuccess', async(() => {
    const state = notificationReducer({notifications: [notification]}, hideNotificationSuccess({notifications: []}));
    expect(state.notifications).toEqual([]);
  }));

  it('should return state with no notification', async(() => {
    const state = notificationReducer(notificationInitialState, sendNotification({notification}));
    expect(state.notifications).toEqual(notificationInitialState.notifications);
  }));

  describe('getter methods', () => {
    it('should get notifications', () => {
      expect(getNotifications(notificationInitialState)).toBe(notificationInitialState.notifications);
    });
  });
});
