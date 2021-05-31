import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { navigationBarFeatureName } from './navigation-bar.actions';
import { navigationBarMenuReducer } from './navigation-bar.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(navigationBarFeatureName, navigationBarMenuReducer)
  ]
})
export class NavigationBarStoreModule {
}
