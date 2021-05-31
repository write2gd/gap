import { createFeatureSelector } from '@ngrx/store';
import { TranslationState } from './translation.state';
import { translationFeatureName } from './translation.actions';

export const getTranslationIsLoading = (state: TranslationState) => state && state.isTranslationsLoading;
export const translationsFeatureSelector = createFeatureSelector<TranslationState>(translationFeatureName);
