import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { AppComponentBase } from '@app/shared/app-component-base';
import { FavoriteService } from '@app/shared/favorites/favorite.service';
import { CapitalizeFirstLetter } from '@app/swapi/swapi-service/swapi-helper';
import { SwapiService } from '@app/swapi/swapi-service/swapi.service';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Person } from '../Person';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCardComponent extends AppComponentBase implements OnInit, OnDestroy {
  @Input() id?: number;

  errorMessage?: string;
  detailedError?: string;

  loading = true;
  person?: Person;
  isFavorite = false;
  uniqueIdentifier = 'people';

  private unsubscribeSubject: Subject<boolean> = new Subject();

  constructor(injector: Injector,
    private swapiService: SwapiService,
    private changeDetector: ChangeDetectorRef,
    private favoriteService: FavoriteService) {
    super(injector);
  }

  public get description() {
    if (!this.person) {
      return 'This person is so misterious we could not find any information about him.';
    }

    const gender = CapitalizeFirstLetter(this.person.gender) ?? 'Not gendered';
    const hair = this.person.hair_color ?? 'no';
    const eyes = this.person.eye_color ?? 'no';
    const skin = this.person.skin_color ?? 'no';
    const born = this.person.birth_year ?? 'unknown day';
    const mass = this.person.mass;
    const height = this.person.height;
    return `${gender} with ${hair} hair, ${eyes} eyes and ${skin} skin. Born on ${born}, weights ${mass} kg and is ${height} cm tall.`;
  }

  ngOnInit() {
    this.getPerson();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next(true);
  }

  getPerson() {
    if (!this.id) {
      this._onError("Failed to get id");
      return;
    }

    this.swapiService.getSingle<Person>(this.id, this.uniqueIdentifier)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe({
        next: (person: Person) => this._onPerson(person),
        error: (error) => this._onError(error)
      });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFromArray(this.uniqueIdentifier, this.person);
    } else {
      this.favoriteService.addToArray(this.uniqueIdentifier, this.person);
    }

    this.isFavorite = !this.isFavorite;
    this.changeDetector.detectChanges();
  }

  private _onError(error: string | object): void {
    if (typeof error === 'string') {
      this.detailedError = undefined;
      this.errorMessage = error;
    } else {
      this.errorMessage = "Failed to receive data from backend!";
      this.detailedError = JSON.stringify(error, null, 2);
    }

    this.changeDetector.markForCheck();
  }

  private _onPerson(person: Person): void {
    this.person = person;
    this._checkFavorite();
    this.changeDetector.markForCheck();
  }

  private _checkFavorite() {
    if (!this.person) {
      this.isFavorite = false;
      return;
    }

    if (!this.id) {
      this.isFavorite = false;
      return;
    }
    
    const favorites = this.favoriteService.get(this.uniqueIdentifier) as Person[];
    if (!favorites) {
      this.isFavorite = false;
      return;
    }

    this.isFavorite = favorites.some(x => x.name === this.person?.name);
  }
}
