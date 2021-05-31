import { changeLanguageSuccess, rehydrateTranslations, translationsLoaded } from './translation.actions';
import { translationInitialState, TranslationState } from './translation.state';
import { Action, createReducer, on } from '@ngrx/store';

export const reducer = createReducer<TranslationState>(
  translationInitialState,
  on(changeLanguageSuccess, (state, {language}) => ({
    ...state,
    currentLang: language
  })),
  on(translationsLoaded, state => ({
    ...state,
    isTranslationsLoading: false
  })),
  on(rehydrateTranslations, (state, {state: rehydratedState}) => ({...state, ...rehydratedState}))
);

export function translationReducer(state: TranslationState, action: Action): TranslationState {
  return reducer(state, action);
}
