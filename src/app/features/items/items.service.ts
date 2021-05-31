import { Injectable } from '@angular/core';
import { MagicItem } from '../../shared/items-grid/magic-item.model';
import { Observable, race } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment-static';
import { JsvsCacheService } from '@jsvs/cache';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly itemsUrl: string = `${environment().api}/items`;
  private readonly matchCombinationUrl: string = `http://10.222.151.94:8083/api/v1/cc/poc/match/combination`;

  constructor(private http: HttpClient,
              private cache: JsvsCacheService) {
  }

  matchCombination(matchForm?: any): Observable<any> {
    console.log(matchForm);
    return this.http.post(this.matchCombinationUrl, matchForm);
  }
  // getItems(teamName?: string): Observable<MagicItem[]> {
  //   let params: HttpParams = new HttpParams();
  //   if (teamName) {
  //     params = params.set('team', teamName);
  //   }
  //   const itemStorageKey: string = `${this.itemsUrl}?${params.toString()}`;
  //
  //   return race(
  //     this.cache.get<MagicItem[]>(itemStorageKey),
  //     this.http.get<MagicItem[]>(this.itemsUrl, {params}).pipe(
  //       tap(itemResponse => this.cache.set<MagicItem[]>(itemStorageKey, itemResponse))
  //     )
  //   );
  // }
}
