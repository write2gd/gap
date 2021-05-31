import { Resolve } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { ActionCreator, Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';

export class StateResolver<S> implements Resolve<S> {
  constructor(private store: Store<S>,
              private forage: LocalForage,
              private action: ActionCreator<string, (props: {state: S}) => {state: S} & TypedAction<string>>,
              private initialState: S) {
  }

  public resolve(): Observable<S> {
    return from(this.forage.getItem<S>('state')).pipe(
      tap(state => this.store.dispatch(this.action({state}))),
      catchError(() => of(this.initialState))
    );
  }

}
