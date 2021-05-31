import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import { authFailed } from './store/security.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 401) {
          this.store.dispatch(authFailed());
        }
        return throwError(errorResponse);
      })
    );
  }
}
