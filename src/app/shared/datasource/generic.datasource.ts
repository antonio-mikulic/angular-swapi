import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, fromEvent, Observable, Observer, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, tap } from 'rxjs/operators';

import { DataChangeType } from './DataChangeType';
import { Entity } from './Entity';
import { IGenericDatasourceRequest } from './GenericDatasourceRequest';
import { PagedResult } from './PagedResult';

export abstract class GenericDataSource<T extends Entity> implements DataSource<T> {
  private _paginator?: MatPaginator;
  private _table?: MatTable<T>;
  private _search?: ElementRef;

  protected dataSubject = new BehaviorSubject<T[]>([]);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  protected countSubject = new BehaviorSubject<number>(0);
  protected lastRequest: string = '';

  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.countSubject.asObservable();
  public dataChangeSubject = new BehaviorSubject<DataChangeType[]>([]);
  public dataReloadSubject = new BehaviorSubject<boolean>(false);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.dataChangeSubject.subscribe((change) =>
      this._onDataChange(change)
    );
  }

  protected abstract getData(request: IGenericDatasourceRequest): Observable<PagedResult<T>>;

  get data(): T[] {
    return this.dataSubject.value;
  }

  public get paginator(): MatPaginator {
    return this._paginator!;
  }

  public set paginator(v: MatPaginator) {
    this._paginator = v;
    this.initPagingEvents();
  }

  public get table(): MatTable<T> {
    return this._table!;
  }

  public set table(v: MatTable<T>) {
    this._table = v;
  }

  public get search(): ElementRef {
    return this._search!;
  }

  public set search(v: ElementRef) {
    this._search = v;
    this._initSearchEvents();
  }

  public refresh(): void {
    this.dataReloadSubject.next(true);
  }

  public connect(_collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  public disconnect(_collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  protected compareIds(a: T, b: T) {
    return a.id == b.id;
  }

  private _initSearchEvents() {
    if (!this.search) return;

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.dataReloadSubject.next(true);
        })
      )
      .subscribe();
  }

  private initPagingEvents() {
    if (this.paginator) {
      this.paginator.page
        .pipe(
          tap(() => {
            this.dataReloadSubject.next(true);
          })
        )
        .subscribe();
    }
  }

  load(request: IGenericDatasourceRequest) {
    request = this._setFilter(request);
    request = this._setPaging(request);

    if (request.saveKey) {
      localStorage.setItem(request.saveKey, JSON.stringify(request));
    }

    this.loadingSubject.next(true);

    this.getData(request)
      .pipe(
        catchError((err, _caught) => {
          console.error(err);
          return of([]);
        }),
        finalize(() => {
          this.loadingSubject.next(false);
        })
      ).subscribe((data: any) => {
        data as PagedResult<T>;
        const items = data.items ?? [];
        this.countSubject.next(data.totalCount ?? 0);

        if (this.lastRequest !== JSON.stringify(request)) {
          this.dataSubject.next(items);
        } else {
          this._onNewItemsReceived(data.items ?? []);
        }

        this.lastRequest = JSON.stringify(request);
      });
  }

  private _setPaging(request: IGenericDatasourceRequest) {
    if (!request.page) {
      request.page = this.paginator ? this.paginator.pageIndex : 0;
    }

    if (!request.take) {
      request.take = this.paginator ? this.paginator.pageSize : 0;
    }

    return request;
  }

  private _setFilter(request: IGenericDatasourceRequest) {
    if (!request.filter) {
      request.filter = this.search ? this.search.nativeElement.value : null;
    }
    return request;
  }

  private _onNewItemsReceived(newItems: T[]): void {
    let changeTypes: DataChangeType[] = [];

    for (let item of this.data) {
      const foundIndex = this.dataSubject.value.findIndex((x) => this.compareIds(x, item));
      if (foundIndex != -1) { return; }
      this.dataSubject.value.splice(foundIndex, 1);
      changeTypes.push(DataChangeType.Removed);
    }

    for (let item of newItems) {
      const foundIndex = this.dataSubject.value.findIndex((x) => this.compareIds(x, item));

      if (foundIndex === -1) {
        changeTypes.push(DataChangeType.Added);
        this.dataSubject.value.push(item);
        continue;
      }

      const foundItem = this.dataSubject.value[foundIndex];
      if (JSON.stringify(foundItem) === JSON.stringify(item)) {
        continue;
      }

      changeTypes.push(DataChangeType.Updated);
      this.dataSubject.value[foundIndex] = { ...item };
    }

    this.dataChangeSubject.next(changeTypes);
  }

  private _onDataChange(changes: DataChangeType[]): void {
    if (!changes?.length) { return; }

    this.changeDetectorRef.markForCheck();

    const isSizeChanged = changes.find((change) =>
      change === DataChangeType.Added || change === DataChangeType.Removed);

    if (isSizeChanged) {
      this.paginator._changePageSize(this.paginator.pageSize);
    } else {
      this.table.renderRows();
    }
  }
}
