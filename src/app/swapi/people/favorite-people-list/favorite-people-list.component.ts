import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FavoriteService } from '@app/shared/favorites/favorite.service';

import { Person } from '../Person';

@Component({
  selector: 'app-favorite-people-list',
  templateUrl: './favorite-people-list.component.html',
  styleUrls: ['./favorite-people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritePeopleListComponent {

  people: Person[];
  
  constructor(private favoriteService: FavoriteService) {
    this.people = favoriteService.get('people');
  }

}
