import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SwapiService } from '@app/swapi/swapi-service/swapi.service';
import { BehaviorSubject } from 'rxjs';

import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  movies$ = new BehaviorSubject<Movie[]>([]);

  private _ids: number[] = [];

  @Input() set ids(ids: number[]) {
    this._ids = ids;
    this.loadMovies(this._ids);
  }

  get ids() {
    return this._ids;
  }

  constructor(private swapiService: SwapiService, private changeDetectorRef: ChangeDetectorRef) { }

  loadMovies(ids: number[]) {
    this.movies$.next([]);

    for (const id of ids) {
      this.swapiService.getSingle<Movie>(id, 'films').subscribe((movie) => {
        const updatedMovies = [...this.movies$.value, movie];
        this.movies$.next(updatedMovies);
      });
    }
  }
}
