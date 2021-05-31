import { async } from '@angular/core/testing';
import { getStorage } from './translation-state.storage';
import * as localForage from 'localforage';
import { translationFeatureName } from './translation.actions';

describe('TranslationStateStorage', () => {

  it('should return initial state on first select', async(() => {
    spyOn(localForage, 'createInstance');
    getStorage();
    expect(localForage.createInstance).toHaveBeenCalledWith({name: 'pos-angular', storeName: `store.${translationFeatureName}`});
  }));

});
