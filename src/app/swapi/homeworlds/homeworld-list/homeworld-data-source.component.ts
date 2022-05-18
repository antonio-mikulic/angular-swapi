import { ChangeDetectorRef } from '@angular/core';
import { GenericDataSource } from '@app/shared/datasource/generic.datasource';
import { PagedResult } from '@app/shared/datasource/PagedResult';
import { Observable } from 'rxjs';

import { SwapiService } from '../../swapi-service/swapi.service';
import { GetAllHomeworldInput } from '../GetAllHomeworldInput';
import { Homeworld } from '../Homeworld';

export class PeopleDataSource extends GenericDataSource<Homeworld> {
  constructor(private dataService: SwapiService, changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  protected getData(request: GetAllHomeworldInput): Observable<PagedResult<Homeworld>> {
    request.page = request.page ? ++request.page : 0;
    return this.dataService.getAll(request);
  }

  protected override compareIds(a: Homeworld, b: Homeworld) {
    return a.name === b.name;
  }
}