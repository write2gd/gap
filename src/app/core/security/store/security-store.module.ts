import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { securityFeatureName } from './security.actions';
import { securityReducer } from './security.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SecurityEffects } from './security.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(securityFeatureName, securityReducer),
    EffectsModule.forFeature([SecurityEffects]),
  ]
})
export class SecurityStoreModule {
}
