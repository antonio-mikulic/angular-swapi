import { ChangeDetectorRef } from '@angular/core';
import { GenericDataSource } from '@app/shared/datasource/generic.datasource';
import { PagedResult } from '@app/shared/datasource/PagedResult';
import { Observable } from 'rxjs';

import { SwapiService } from '../../swapi-service/swapi.service';
import { GetPeopleInput } from '../GetPeopleInput';
import { Person } from '../Person';

export class PeopleDataSource extends GenericDataSource<Person> {
  constructor(private dataService: SwapiService, changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  protected getData(request: GetPeopleInput): Observable<PagedResult<Person>> {
    request.page = request.page ? ++request.page : 0;
    return this.dataService.getAll(request);
  }

  protected override compareIds(a: Person, b: Person) {
    return a.name === b.name;
  }
}