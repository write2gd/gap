import * as localForage from 'localforage';
import { translationFeatureName } from './translation.actions';

export function getStorage(): LocalForage {
  return localForage.createInstance({name: 'pos-angular', storeName: `store.${translationFeatureName}`});
}
