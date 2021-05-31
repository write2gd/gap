import { NgModule } from '@angular/core';
import { JsvsNotificationModule, Notification, ON_HIDDEN_NOTIFICATION } from '@jsvs/notification';
import { notificationConfig } from './notification.config';
import { Store } from '@ngrx/store';
import { NotificationState } from './store/notification.state';
import { NotificationStoreModule } from './store/notification-store.module';
import { hideNotification } from './store/notification.actions';

export const onHiddenNotificationFactory = (store: Store<NotificationState>) => {
  return (notification: Notification) => {
    store.dispatch(hideNotification({notification}));
  };
};

@NgModule({
  imports: [
    JsvsNotificationModule.configure(notificationConfig),
    NotificationStoreModule
  ],
  providers: [
    {provide: ON_HIDDEN_NOTIFICATION, useFactory: onHiddenNotificationFactory, deps: [Store]}
  ],
  exports: [JsvsNotificationModule]
})
export class NotificationModule {
}
