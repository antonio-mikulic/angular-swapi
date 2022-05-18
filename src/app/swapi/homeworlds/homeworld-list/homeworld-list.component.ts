import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@app/shared/app-component-base';
import { ColumnConfig } from '@app/shared/datagrid/ColumnConfig';
import { DataGridComponent } from '@app/shared/datagrid/data.grid.component';
import { SwapiService } from '@app/swapi/swapi-service/swapi.service';

import { GetAllHomeworldInput } from '../GetAllHomeworldInput';
import { PeopleDataSource } from './homeworld-data-source.component';

@Component({
  selector: 'app-homeworld-list',
  templateUrl: './homeworld-list.component.html',
  styleUrls: ['./homeworld-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeworldListComponent extends AppComponentBase implements AfterViewInit {
  @ViewChild(DataGridComponent) grid?: DataGridComponent;

  dataSource: PeopleDataSource;
  requestKey = 'planet-list';
  startInput?: GetAllHomeworldInput;

  columns: ColumnConfig[] = [
    { name: 'name', displayName: 'Name' },
    { name: 'rotation_period', displayName: 'Rotation Period' },
    { name: 'orbital_period', displayName: 'Orbital Period' },
    { name: 'diameter', displayName: 'Diameter' },
    { name: 'climate', displayName: 'Climate' },
    { name: 'gravity', displayName: 'Gravity' },
    { name: 'terrain', displayName: 'Terrain' },
    { name: 'surface_water', displayName: 'Water' },
    { name: 'population', displayName: 'Population' },
  ];

  constructor(
    injector: Injector,
    private _SwapiService: SwapiService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(injector);
    this.loadStartInput();
    this.dataSource = new PeopleDataSource(this._SwapiService, changeDetectorRef);
  }

  loadStartInput() {
    const request = localStorage.getItem(this.requestKey);
    if (request) {
      this.startInput = JSON.parse(request);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.dataReloadSubject.subscribe(() => this.refresh());
  }

  refresh(): void {
    let input = new GetAllHomeworldInput();
    input.saveKey = this.requestKey;
    this.dataSource.load(input);
  }
}
