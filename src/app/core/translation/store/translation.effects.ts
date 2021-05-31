import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changeLanguage,
  changeLanguageSuccess,
  RegisterModuleAction,
  registerModule,
  TranslationActions,
  ChangeLanguageSuccessAction
} from './translation.actions';
import { JsvsTranslationService } from '@jsvs/translation';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { TranslationState } from './translation.state';
import { Store } from '@ngrx/store';
import { translationsFeatureSelector } from './translation.selectors';
import { getStorage } from './translation-state.storage';
import { PersistentStoreEffect } from '../../../shared/persistent-store/persistent-store-effect';

@Injectable()
export class TranslationEffects extends PersistentStoreEffect<TranslationActions, TranslationState> {
  changeLanguage$ = createEffect(this.changeLanguage.bind(this) as () => ChangeLanguageSuccessAction);
  registerModule$ = createEffect(this.registerModule.bind(this) as () => RegisterModuleAction, {dispatch: false});

  constructor(actions$: Actions<TranslationActions>,
              private translationService: JsvsTranslationService,
              store: Store<TranslationState>) {
    super(
      actions$,
      store,
      [changeLanguageSuccess],
      translationsFeatureSelector,
      getStorage()
    );
  }

  private changeLanguage(): ChangeLanguageSuccessAction {
    return this.actions$.pipe(
      ofType(changeLanguage),
      switchMap(action => this.translationService.changeLanguage(action.language)),
      distinctUntilChanged(),
      map(language => changeLanguageSuccess({language}))
    );
  }

  private registerModule(): RegisterModuleAction {
    return this.actions$.pipe(
      ofType(registerModule),
      tap(({modulePath}) => this.translationService.registerFor(modulePath))
    );
  }
}
