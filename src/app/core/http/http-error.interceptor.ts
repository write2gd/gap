import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppState } from '../../store/app.state';
import { httpError } from './store/http.actions';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          this.store.dispatch(httpError({httpErrorResponse: errorResponse}));
        }
        return throwError(errorResponse);
      })
    );
  }
}
