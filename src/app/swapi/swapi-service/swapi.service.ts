import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '@app/shared/datasource/Entity';
import { PagedResult } from '@app/shared/datasource/PagedResult';
import {
  GetAllFromSwapi,
  GetAllSwapiUrl,
  GetSingleFromSwapi,
  GetSingleSwapiUrl,
  ValidateSwapiTake,
} from '@app/swapi/swapi-service/swapi-helper';
import { Observable, of } from 'rxjs';

import { GetAllSwapiInput } from './SwapiInput';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  simpleCache = new Map<string, Entity>();

  constructor(private http: HttpClient) { }

  getAll<TEntity>(input: GetAllSwapiInput): Observable<PagedResult<TEntity>> {
    ValidateSwapiTake(input);
    const url = GetAllSwapiUrl((input.page ?? 0), input.endpoint, input.filter);

    return GetAllFromSwapi<TEntity>(this.http, url);
  }

  getSingle<TEntity>(id: number, endpoint: string): Observable<TEntity> {
    const url = GetSingleSwapiUrl(id, endpoint);

    if (this.simpleCache.has(url)) {
      return of(this.simpleCache.get(url) as TEntity);
    }

    const observable = GetSingleFromSwapi<TEntity>(this.http, url);

    observable.subscribe((res) => {
      this.simpleCache.set(url, res);
    });

    return observable;
  }
}
