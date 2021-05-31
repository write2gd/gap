import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as ngrx from '@ngrx/store';
import { AppState } from '../app/store/app.reducer';

@Injectable()
export class MockStore<StateType extends AppState = AppState> extends BehaviorSubject<StateType> {
  private selectorsToValues: Map<(...args: any[]) => any, any> = new Map();
  public dispatch = jasmine.createSpy();

  public select = jasmine.createSpy().and.callFake(
    (selector: any): Observable<any> => {
      return this.getObservableWithMockResult(selector).pipe(distinctUntilChanged());
    }
  );

  constructor(initialState: StateType = null, private returnNullForUnhandledSelectors = true) {
    super(null);
    spyOnProperty(ngrx, 'select').and.callFake(_ => {
      return selector => {
        return () => this.getObservableWithMockResult(selector).pipe(distinctUntilChanged());
      };
    });
  }

  private getObservableWithMockResult(selector: any): Observable<any> {
    let obs$: Observable<any>;

    if (this.selectorsToValues.has(selector)) {
      const value = this.selectorsToValues.get(selector);

      obs$ = value instanceof Observable ? value : this.pipe(map(() => value));
    } else {
      obs$ = this.pipe(map(() => (this.returnNullForUnhandledSelectors ? null : selector(this.getValue()))));
    }
    return obs$;
  }

  addSelectorStub<T>(cb: (...args: any[]) => T, mockedValue: T | Observable<T>): this {
    this.selectorsToValues.set(cb, mockedValue);
    return this;
  }

  setState(state: StateType): this {
    this.next(state);
    return this;
  }

  setReturnNullForUnandledSelectors(value: boolean): this {
    this.returnNullForUnhandledSelectors = value;
    return this;
  }
}
