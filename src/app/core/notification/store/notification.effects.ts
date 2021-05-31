import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  sendNotification,
  hideNotification,
  sendNotificationSuccess,
  hideNotificationSuccess,
  SendNotificationSuccessAction,
  HideNotificationSuccessAction, NotificationActions
} from './notification.actions';
import { JsvsNotificationService } from '@jsvs/notification';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { notificationsSelector } from './notification.selectors';
import { NotificationState } from './notification.state';

@Injectable()
export class NotificationEffects {
  sendNotification$ = createEffect(this.sendNotification.bind(this) as () => SendNotificationSuccessAction);
  hideNotification$ = createEffect(this.hideNotification.bind(this) as () => HideNotificationSuccessAction);

  constructor(private actions$: Actions<NotificationActions>,
              private notificationService: JsvsNotificationService,
              private store: Store<NotificationState>) {
  }

  private sendNotification(): SendNotificationSuccessAction {
    return this.actions$.pipe(
      ofType(sendNotification),
      map(action => action.notification),
      map(notification => this.notificationService[notification.notificationType](notification)),
      filter(notification => !!notification),
      map(notification => sendNotificationSuccess({notification}))
    );
  }

  private hideNotification(): HideNotificationSuccessAction {
    return this.actions$.pipe(
      ofType(hideNotification),
      withLatestFrom(this.store.select(notificationsSelector)),
      map(([action, notifications]) => notifications.filter(notification => notification !== action.notification)),
      map(notifications => hideNotificationSuccess({notifications}))
    );
  }
}
