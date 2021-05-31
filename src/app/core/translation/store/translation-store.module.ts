import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { translationFeatureName } from './translation.actions';
import { translationReducer } from './translation.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TranslationEffects } from './translation.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(translationFeatureName, translationReducer),
    EffectsModule.forFeature([TranslationEffects])
  ]
})
export class TranslationStoreModule {
}
