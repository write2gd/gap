import { Action, ActionCreator, Creator, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class PersistentStoreEffect<A extends Action, S> {
  saveState$ = createEffect(this.saveState.bind(this), {dispatch: false});

  constructor(protected actions$: Actions<A>,
              protected store: Store<S>,
              private actionsToSave: Array<string | ActionCreator<string, Creator>>,
              private selector: (state: S) => S,
              private forage: LocalForage) {
  }

  protected saveState(): Observable<S> {
    return this.actions$.pipe(
      ofType(...this.actionsToSave),
      withLatestFrom(this.store.select(this.selector)),
      map(([action, state]) => state),
      tap(state => {
        this.forage.setItem('state', state);
      })
    );
  }
}
