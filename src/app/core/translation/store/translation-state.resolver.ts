import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { translationInitialState, TranslationState } from './translation.state';
import { getStorage } from './translation-state.storage';
import { rehydrateTranslations } from './translation.actions';
import { StateResolver } from '../../../shared/persistent-store/state.resolver';

@Injectable({
  providedIn: 'root'
})
export class TranslationStateResolver extends StateResolver<TranslationState> {
  constructor(store: Store<TranslationState>) {
    super(
      store,
      getStorage(),
      rehydrateTranslations,
      translationInitialState
    );
  }
}
