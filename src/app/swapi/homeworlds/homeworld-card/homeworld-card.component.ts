import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Homeworld } from '../Homeworld';

@Component({
  selector: 'app-homeworld-card',
  templateUrl: './homeworld-card.component.html',
  styleUrls: ['./homeworld-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeworldCardComponent {

  @Input() homeworld?: Homeworld;

  constructor() { }
}
