import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T = {}> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  public dispatch = jasmine.createSpy();

  setState(data: T) {
    this.state.next(data);
  }

  select(selector: any): Observable<T> {
    return this.state.asObservable();
  }

  pipe(): Observable<T> {
    return this.state.asObservable();
  }
}
