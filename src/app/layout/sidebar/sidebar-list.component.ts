import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';

import { MenuItem } from './MenuItem';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSidebarListComponent extends AppComponentBase {
  public menu: MenuItem[] = [
    new MenuItem('/swapi/people', 'People', 'person'),
    new MenuItem('/swapi/planets', 'Planets', 'public'),
    new MenuItem('/random-page', '404', 'gpp_bad'),
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void { }
}
