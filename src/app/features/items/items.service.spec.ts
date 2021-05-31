import { async, inject, TestBed } from '@angular/core/testing';
import { ItemsService } from './items.service';
import { MagicItem } from '../../shared/items-grid/magic-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, NEVER, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockService } from '../../../tests/mocked-services';
import { HttpService } from '../../core/http/http.service';
import { environment } from '../../environment/environment-static';
import { JsvsCacheService } from '@jsvs/cache';

describe('ItemsService', () => {
  let service: ItemsService,
    cache: JsvsCacheService,
    http: HttpClient,
    httpService: HttpService;

  const testUrl: string = `${environment().api}/items`;
  const testResponse: MagicItem[] = [];
  const testHttpParams: HttpParams = new HttpParams().set('team', 'Team A');
  const testCacheKey: string = `${testUrl}?${testHttpParams.toString()}`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ItemsService,
        {provide: HttpService, useValue: mockService(HttpService)},
        {provide: JsvsCacheService, useValue: mockService(JsvsCacheService)}
      ]
    });

    service = TestBed.get(ItemsService);
    cache = TestBed.get(JsvsCacheService);
    http = TestBed.get(HttpClient);
    httpService = TestBed.get(HttpService);

    (httpService.createHttpParams as jasmine.Spy).and.returnValue(testHttpParams);
  }));

  it('should be created', inject([ItemsService], (itemService: ItemsService) => {
    expect(itemService).toBeTruthy();
  }));

  describe('#getItems', () => {
    it('should get the MagicItems based on Team assignment from API', async(() => {
      (cache.get as jasmine.Spy).and.returnValue(NEVER);
      const result$: Observable<MagicItem[]> = service.getItems('Team A');

      result$.subscribe(result => {
        expect(cache.get).toHaveBeenCalledWith(testCacheKey);
        expect(cache.set).toHaveBeenCalledWith(testCacheKey, testResponse);
        expect(result.length).toEqual(5);
        expect(http.get).toHaveBeenCalledWith(testUrl, {params: testHttpParams});
      });

    }));

    it('should get the MagicItems based on Team assignment from cache', async(() => {
      spyOn(http, 'get').and.returnValue(NEVER);
      (cache.get as jasmine.Spy).and.returnValue(of(testResponse));
      const result$: Observable<MagicItem[]> = service.getItems('Team A');

      result$.subscribe(result => {
        expect(cache.get).toHaveBeenCalledWith(testCacheKey);
        expect(cache.set).not.toHaveBeenCalled();
        expect(result).toEqual(testResponse);
        expect(http.get).toHaveBeenCalledWith(testUrl, {params: testHttpParams});
      });

    }));
  });

});
