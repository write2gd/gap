import { StateResolver } from './state.resolver';
import { async, TestBed } from '@angular/core/testing';
import { createAction, props, Store } from '@ngrx/store';
import { TestStore } from '../../../tests/test.store';

describe('StateResolver', () => {
  function getStorage(): LocalForage {
    return jasmine.createSpyObj(['getItem']);
  }

  let store: Store<{}>,
      resolver;
  const action       = createAction(`[Test] Test Action`, props<{ state: {} }>()),
        initialState = {},
        storage      = getStorage();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Store, useClass: TestStore}
      ]
    });

    store = TestBed.get(Store);
    resolver = new StateResolver<any>(store, storage, action, initialState);
  }));

  it('should resolve and dispatch provided action with state to save', async(() => {
    (storage.getItem as jasmine.Spy).and.callFake(() => Promise.resolve(initialState));
    resolver.resolve().subscribe(state => {
      expect(store.dispatch).toHaveBeenCalledWith(action({state}));
    });
  }));

  it('should resolve and provide initial state on error', async(() => {
    (storage.getItem as jasmine.Spy).and.callFake(() => Promise.reject());
    resolver.resolve().subscribe(state => {
      expect(state).toEqual(initialState);
    });
  }));

});
