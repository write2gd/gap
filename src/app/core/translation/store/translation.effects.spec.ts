import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { mockService } from '../../../../tests/mocked-services';
import { TranslationEffects } from './translation.effects';
import { changeLanguage, changeLanguageSuccess, registerModule, TranslationActions } from './translation.actions';
import { JsvsTranslationService } from '@jsvs/translation';
import { Store } from '@ngrx/store';
import { TestStore } from '../../../../tests/test.store';

describe('TranslationEffects', () => {

  let effects: TranslationEffects,
      actions: ReplaySubject<TranslationActions>,
      translationService: JsvsTranslationService;

  const language: string = 'en_GB',
        modulePath: string = 'features/parts';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TranslationEffects,
        provideMockActions(() => actions),
        {provide: JsvsTranslationService, useValue: mockService(JsvsTranslationService)},
        {provide: Store, useClass: TestStore}
      ]
    });

    translationService = TestBed.get(JsvsTranslationService);
    effects = TestBed.get(TranslationEffects);
  }));

  it('should catch ChangeLanguageReturnType action, call service and dispatch ChangeLanguageSuccess', async(() => {
    (translationService.changeLanguage as jasmine.Spy).and.returnValue(of(language));
    actions = new ReplaySubject(1);
    actions.next(changeLanguage({language}));
    effects.changeLanguage$.subscribe(result => {
      expect(translationService.changeLanguage).toHaveBeenCalledWith(language);
      expect(result).toEqual(changeLanguageSuccess({language}));
    });
  }));

  it('should catch RegisterModuleAction action and call service', async(() => {
    actions = new ReplaySubject(1);
    actions.next(registerModule({modulePath}));
    effects.registerModule$.subscribe(result => {
      expect(translationService.registerFor).toHaveBeenCalledWith(result.modulePath);
    });
  }));

});
