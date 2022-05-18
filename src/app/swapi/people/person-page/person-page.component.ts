import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@app/shared/app-component-base';

import { Person } from '../Person';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonPageComponent extends AppComponentBase {
  id?: number;

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })
  }
}
