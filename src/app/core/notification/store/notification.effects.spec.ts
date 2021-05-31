import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject } from 'rxjs';
import { mockService } from '../../../../tests/mocked-services';
import { NotificationEffects } from './notification.effects';
import { notificationReducer} from './notification.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { JsvsNotificationService, Notification } from '@jsvs/notification';
import { TestStore } from '../../../../tests/test.store';
import { NotificationType } from './notification.state';
import {
  hideNotification,
  hideNotificationSuccess,
  NotificationActions,
  sendNotification,
  sendNotificationSuccess
} from './notification.actions';

describe('NotificationEffects', () => {

  let effects: NotificationEffects,
      actions: ReplaySubject<NotificationActions>,
      notificationService: JsvsNotificationService;

  const notification: Notification = {
    message: 'SUCCESS',
    notificationType: NotificationType.SUCCESS
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({notifications: notificationReducer})
      ],
      providers: [
        NotificationEffects,
        provideMockActions(() => actions),
        {provide: JsvsNotificationService, useValue: mockService(JsvsNotificationService)},
        {provide: Store, useClass: TestStore}
      ]
    });

    notificationService = TestBed.get(JsvsNotificationService);
    effects = TestBed.get(NotificationEffects);
  });

  it('should catch SendNotification, trigger toastr, filter notification and dispatch SendNotificationSuccess', async(() => {
    (notificationService.sendSuccess as jasmine.Spy).and.returnValue(notification);
    actions = new ReplaySubject(1);
    actions.next(sendNotification({notification}));
    effects.sendNotification$.subscribe(result => {
      expect(notificationService.sendSuccess).toHaveBeenCalledWith(notification);
      expect(result).toEqual(sendNotificationSuccess({notification}));
    });
  }));

  it('should catch SendNotification, trigger toastr and filter notification', async(() => {
    (notificationService.sendSuccess as jasmine.Spy).and.returnValue(null);
    actions = new ReplaySubject(1);
    actions.next(sendNotification({notification}));
    effects.sendNotification$.subscribe(result => {
      expect(notificationService.sendSuccess).toHaveBeenCalledWith(notification);
      expect(result).toEqual(null);
    });
  }));

  it('should catch HideNotification filter and dispatch HideNotificationSuccess', async(() => {
    actions = new ReplaySubject(1);
    const store: TestStore = TestBed.get(Store);
    store.setState([notification]);
    actions.next(hideNotification({notification}));
    effects.hideNotification$.subscribe(result => {
      expect(result).toEqual(hideNotificationSuccess({notifications: []}));
    });
  }));

});
