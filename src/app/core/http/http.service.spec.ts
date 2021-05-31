import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpParams } from '@angular/common/http';

describe('HttpService', () => {
  const testParams = {
    a: '1',
    b: 2
  };

  const testHttpParams = new HttpParams().set('a', '1').set('b', '2'),
        filteredHttpParams = new HttpParams().set('a', '1');

  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService]
    });
    service = TestBed.get(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create HttpParams from object', () => {
    const httpParams: HttpParams = service.createHttpParams(testParams);
    expect(httpParams).toEqual(testHttpParams);
  });

  it('should create HttpParams from object and filter not allowed', () => {
    const httpParams: HttpParams = service.createHttpParams(testParams, ['a']);
    expect(httpParams).toEqual(filteredHttpParams);
  });
});
