import { createAction, props, union } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const httpFeatureName: string = 'Http';

export const httpError = createAction(
  `[${httpFeatureName}] Http Error`,
  props<{ httpErrorResponse: HttpErrorResponse }>()
);

const allActions = union({httpError});
export type HttpActions = typeof allActions;
