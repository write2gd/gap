import { getTranslationIsLoading } from './translation.selectors';
import { translationInitialState } from './translation.state';

describe('TranslationSelectors', () => {

  it('should get isTranslationsLoading', () => {
    expect(getTranslationIsLoading(translationInitialState)).toBe(translationInitialState.isTranslationsLoading);
  });

});
