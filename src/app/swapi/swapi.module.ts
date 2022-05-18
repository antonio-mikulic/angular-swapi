import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { HomeworldListComponent } from './homeworlds/homeworld-list/homeworld-list.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PersonCardComponent } from './people/person-card/person-card.component';
import { PersonPageComponent } from './people/person-page/person-page.component';
import { SwapiService } from './swapi-service/swapi.service';

const routes: Routes = [
  {
    path: "swapi",
    children: [
      { path: "people", component: PeopleListComponent },
      { path: "people/:id", component: PersonPageComponent },
      { path: "planets", component: HomeworldListComponent },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PeopleListComponent,
    HomeworldListComponent,
    PersonPageComponent,
    PersonCardComponent,
  ],
  exports: [
    PeopleListComponent,
    RouterModule,
    HomeworldListComponent
  ],
  providers: [
    SwapiService
  ]
})
export class SwapiModule { }
