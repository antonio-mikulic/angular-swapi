import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { HomeworldListComponent } from './swapi/homeworlds/homeworld-list/homeworld-list.component';

const routes: Routes = [
  {
    path: "swapi",
    loadChildren: () => import('./swapi/swapi.module').then(m => m.SwapiModule),
  },
  {
    path: "",
    redirectTo: "swapi/people",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
