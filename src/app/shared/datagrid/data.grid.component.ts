import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import { GenericDataSource } from '../datasource/generic.datasource';
import { IGenericDatasourceRequest } from '../datasource/GenericDatasourceRequest';
import { CellClickData } from './CellClickData';
import { ColumnConfig } from './ColumnConfig';

@Component({
  selector: 'data-grid',
  templateUrl: './data.grid.component.html',
  styleUrls: ['./data.grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridComponent implements AfterViewInit {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatTable) private table!: MatTable<any>;
  @ViewChild('input') private input!: ElementRef;

  @Input() columns: ColumnConfig[] = [];
  @Input() dataSource?: GenericDataSource<any>;
  @Input() actionMenu?: MatMenuPanel<any>;
  @Input() pageSize = 10;
  @Input() startInput?: IGenericDatasourceRequest;
  @Input() pageSizeOptions = [2, 5, 10];

  @Output() searchCleared: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCellClick: EventEmitter<CellClickData> = new EventEmitter<CellClickData>();

  displayedColumns: string[] = [];

  public get TableComponent(): MatTable<any> {
    return this.table;
  }

  public get PaginatorComponent(): MatPaginator {
    return this.paginator;
  }

  public get SearchElement(): ElementRef {
    return this.input;
  }

  refresh() {
    this.dataSource?.refresh();
  }

  ngAfterViewInit(): void {
    this._initData();
  }

  clearInput(): void {
    this.searchCleared.emit(null);
    this.input.nativeElement.value = '';
  }

  handleRowClick(row: any) {
    this.onRowClick.emit(row);
  }

  handleCellClick(row: any, column: ColumnConfig) {
    this.onRowClick.emit({row, column});
  }

  setupInput() {
    if (!this.startInput) { return }

    this.paginator.pageSize = this.startInput.take;
    this.input.nativeElement.value = this.startInput.filter;
    this.paginator.pageIndex = this.startInput.page ? this.startInput.page++ : 0;
  }

  private _initData() {
    if (this.dataSource == null) {
      throw Error('DynamicTable must be provided with data source.');
    }
    if (this.columns == null) {
      throw Error('DynamicTable must be provided with column definitions.');
    }

    this.setupInput();

    this.dataSource.table = this.table;
    this.dataSource.paginator = this.paginator;
    this.dataSource.search = this.input;

    this.displayedColumns = this.columns.filter((column => column.name)).map((column) => column.name!);
  }
}
