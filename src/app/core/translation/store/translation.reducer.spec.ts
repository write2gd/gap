import { async } from '@angular/core/testing';
import { translationReducer } from './translation.reducer';
import { translationInitialState, TranslationState } from './translation.state';
import { changeLanguage, changeLanguageSuccess, rehydrateTranslations, translationsLoaded } from './translation.actions';

describe('TranslationReducer', () => {

  const testLanguage: string = 'en_EN',
  testState: TranslationState = {
    isTranslationsLoading: true,
    currentLang: testLanguage
  };

  it('should return initial state on first select', async(() => {
    const state = translationReducer(undefined, changeLanguage({language: testLanguage}));
    expect(state.currentLang).toEqual(translationInitialState.currentLang);
  }));

  it('should return state with currentLang on ChangeLanguageSuccess', async(() => {
    const state = translationReducer(translationInitialState, changeLanguageSuccess({language: testLanguage}));
    expect(state.currentLang).toEqual(testLanguage);
  }));

  it('should return state with initial currentLang when other action', async(() => {
    const state = translationReducer(translationInitialState, changeLanguage({language: testLanguage}));
    expect(state.currentLang).toEqual(translationInitialState.currentLang);
  }));

  it('should return state with isTranslationsLoading false when translationsLoaded is called', async(() => {
    const state = translationReducer(translationInitialState, translationsLoaded());
    expect(state.isTranslationsLoading).toEqual(false);
  }));

  it('should return state with rehydrate state when rehydrateTranslations is called', async(() => {
    const state = translationReducer(translationInitialState, rehydrateTranslations({state: testState}));
    expect(state.isTranslationsLoading).toEqual(true);
  }));

});
