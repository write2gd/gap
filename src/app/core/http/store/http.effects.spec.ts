import { async, TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import { HttpEffects } from './http.effects';
import { NotificationType } from '../../notification/store/notification.state';
import { httpError, HttpActions } from './http.actions';
import { sendNotification } from '../../notification/store/notification.actions';
import { Notification } from '@jsvs/notification';

describe('AuthInterceptorEffects', () => {

  let effects: HttpEffects,
      actions: ReplaySubject<HttpActions>;

  const testError: HttpErrorResponse = {
    headers: new HttpHeaders(),
    type: HttpEventType.Response,
    status: 401,
    statusText: 'Notification status',
    url: '',
    ok: false,
    name: 'HttpErrorResponse',
    message: 'Notification message',
    error: null
  };

  const testNotification: Notification = {
    message: testError.message,
    title: `${testError.status} - ${testError.statusText}`,
    notificationType: NotificationType.ERROR
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(HttpEffects);
  }));

  it('should catch and notify HttpError', async(() => {
    actions = new ReplaySubject(1);
    actions.next(httpError({httpErrorResponse: testError}));
    effects.httpInterceptorError$.subscribe(result => {
      expect(result).toEqual(sendNotification({notification: testNotification}));
    });
  }));

});
