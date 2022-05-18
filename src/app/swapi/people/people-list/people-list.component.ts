import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@app/shared/app-component-base';
import { ColumnConfig } from '@app/shared/datagrid/ColumnConfig';
import { DataGridComponent } from '@app/shared/datagrid/data.grid.component';

import { SwapiService } from '../../swapi-service/swapi.service';
import { GetPeopleInput } from '../GetPeopleInput';
import { Person } from '../Person';
import { PeopleDataSource } from './people-data-source.component';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent extends AppComponentBase implements AfterViewInit {
  @ViewChild(DataGridComponent) grid?: DataGridComponent;

  dataSource: PeopleDataSource;

  columns: ColumnConfig[] = [
    { name: 'name', displayName: 'Name' },
    { name: 'height', displayName: 'Height' },
    { name: 'mass', displayName: 'Mass' },
    { name: 'hair_color', displayName: 'Hair Color' },
    { name: 'skin_color', displayName: 'Skin Color' },
    { name: 'eye_color', displayName: 'Eye Color' },
    { name: 'birth_year', displayName: 'Born' },
    { name: 'gender', displayName: 'Gender' },
  ];

  requestKey = 'people-list';
  startInput?: GetPeopleInput;

  constructor(
    injector: Injector,
    private _SwapiService: SwapiService,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
    super(injector);
    this.loadStartInput();
    this.dataSource = new PeopleDataSource(this._SwapiService, changeDetectorRef);
  }

  openPerson(person: Person) {
    // URL will always end with ...people/id/
    const id = person.url.slice(0, -1).split('/').pop();

    if (!id) {
      return;
    }

    this.router.navigate([`./swapi/people/${id}`]);
  }

  loadStartInput() {
    const request = localStorage.getItem(this.requestKey);
    if (request) {
      this.startInput = JSON.parse(request);
    }
  }

  ngAfterViewInit(): void {
    this.loadStartInput();

    this.dataSource.dataReloadSubject.subscribe(() => this.refresh());
  }

  refresh(): void {
    let input = new GetPeopleInput();
    input.saveKey = this.requestKey;
    this.dataSource.load(input);
  }
}
