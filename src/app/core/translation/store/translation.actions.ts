import { createAction, props, union } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslationState } from './translation.state';

export const translationFeatureName: string = 'translations';

export const registerModule = createAction(
  `[${translationFeatureName}] Register module`,
  props<{modulePath: string}>()
);

export const changeLanguage = createAction(
  `[${translationFeatureName}] Change language request`,
  props<{language: string}>()
);

export const changeLanguageSuccess = createAction(
  `[${translationFeatureName}] Change language success`,
  props<{language: string}>()
);

export const rehydrateTranslations = createAction(
  `[${translationFeatureName}] Rehydrate`,
  props<{ state: TranslationState }>()
);

export const translationsLoaded = createAction(`[${translationFeatureName}] Translations loaded`);

export type RegisterModuleAction = Observable<ReturnType<typeof registerModule>>;
export type ChangeLanguageSuccessAction = Observable<ReturnType<typeof changeLanguageSuccess>>;

const allActions = union({registerModule, changeLanguage, changeLanguageSuccess, rehydrateTranslations});
export type TranslationActions = typeof allActions;
