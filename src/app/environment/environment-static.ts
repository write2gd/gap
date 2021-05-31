import globalThis from 'core-js/es7/globalThis';
import { Environment } from './environment.i';

export function environment(): Environment {
  return globalThis['__env'] || {
    host: '',
    api: '',
    oauth: {
      url: '',
      clientId: ''
    },
    environmentName: '',
    loaded: false
  };
}
