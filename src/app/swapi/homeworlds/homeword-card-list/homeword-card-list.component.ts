import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SwapiService } from '@app/swapi/swapi-service/swapi.service';
import { BehaviorSubject } from 'rxjs';

import { Homeworld } from '../Homeworld';

@Component({
  selector: 'app-homeword-card-list',
  templateUrl: './homeword-card-list.component.html',
  styleUrls: ['./homeword-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomewordCardListComponent {
  homeworlds$ = new BehaviorSubject<Homeworld[]>([]);

  private _ids: number[] = [];

  @Input() set ids(ids: number[]) {
    this._ids = ids;
    this.loadHomeworlds(this._ids);
  }

  get ids() {
    return this._ids;
  }

  constructor(private swapiService: SwapiService) { }

  loadHomeworlds(ids: number[]) {
    this.homeworlds$.next([]);

    for (const id of ids) {
      this.swapiService.getSingle<Homeworld>(id, 'planets').subscribe((homeworld) => {
        this.homeworlds$.next([...this.homeworlds$.value, homeworld]);
      });
    }
  }
}
