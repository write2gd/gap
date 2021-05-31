export interface TranslationState {
  currentLang: string;
  isTranslationsLoading: boolean;
}

export const translationInitialState: TranslationState = {
  currentLang: 'en_GB',
  isTranslationsLoading: true
};
