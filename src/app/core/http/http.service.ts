import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  createHttpParams(parameters: {[key: string]: string | number}, allowed: string[] = []): HttpParams {
    return Object.keys(parameters)
      .filter(key => (!allowed.length || allowed.indexOf(key) > -1) && !!parameters[key])
      .reduce((params, key) => params.set(key, parameters[key].toString()), new HttpParams());
  }

}
