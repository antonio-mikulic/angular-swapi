import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';
import { AppHeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppSidebarListComponent } from './sidebar/sidebar-list.component';

const routes: Routes = [
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    LayoutComponent,
    PageNotFoundComponent,
    AppSidebarListComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    SharedModule,
    MatCardModule,
  ],
  exports: [
    LayoutComponent,
    RouterModule,

  ],
  providers: [],
})
export class AppLayoutModule { }
