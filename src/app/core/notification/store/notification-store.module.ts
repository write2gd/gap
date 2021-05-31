import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { notificationsFeatureName } from './notification.actions';
import { notificationReducer } from './notification.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './notification.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(notificationsFeatureName, notificationReducer),
    EffectsModule.forFeature([NotificationEffects])
  ]
})
export class NotificationStoreModule {
}
