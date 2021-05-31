import { async, TestBed } from '@angular/core/testing';
import { createAction, props, Store } from '@ngrx/store';
import { TestStore } from '../../../tests/test.store';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { PersistentStoreEffect } from './persistent-store-effect';

interface TestState {
  test: boolean;
}

describe('PersistentStoreEffect', () => {
  function getStorage(): LocalForage {
    return jasmine.createSpyObj(['setItem']);
  }

  let store: Store<{}>,
      testStore: TestStore,
      actions: ReplaySubject<any>,
      effect: PersistentStoreEffect<any, {}>;
  const action                  = createAction(`[Test] Test Action`, props<{ state: {} }>()),
        initialState: TestState = {test: true},
        forage                  = getStorage(),
        selector                = () => initialState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions),
        {provide: Store, useClass: TestStore}
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();
    testStore = TestBed.get(Store);
    actions = new ReplaySubject(1);
    effect = new PersistentStoreEffect(actions, store, [action], selector, forage);
  }));

  it('should select state from store and save it to forage', async(() => {
    testStore.setState(initialState);
    actions.next(action({state: initialState}));
    effect['saveState']().subscribe(state => {
      expect(state).toEqual(initialState);
      expect(forage.setItem).toHaveBeenCalledWith('state', initialState);
      expect(testStore.select).toHaveBeenCalledWith(selector);
    });
  }));

});
