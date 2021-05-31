import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { httpError, HttpActions } from './http.actions';
import { sendNotification, SendNotificationAction } from '../../notification/store/notification.actions';
import { map } from 'rxjs/operators';
import { NotificationType } from '../../notification/store/notification.state';

@Injectable()
export class HttpEffects {

  httpInterceptorError$ = createEffect(this.httpInterceptorError.bind(this) as () => SendNotificationAction);

  constructor(private actions$: Actions<HttpActions>) {
  }

  private httpInterceptorError(): SendNotificationAction {
    return this.actions$.pipe(
      ofType(httpError),
      map(action => action.httpErrorResponse),
      map(error => sendNotification({
        notification: {
          message: error.message,
          title: `${error.status} - ${error.statusText}`,
          notificationType: NotificationType.ERROR
        }
      }))
    );
  }
}
