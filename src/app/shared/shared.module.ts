import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { DataGridComponent } from './datagrid/data.grid.component';
import { ErrorCardComponent } from './error-component/error-component.component';
import { FavoriteService } from './favorites/favorite.service';
import { NotifyService } from './messaging/notify.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  declarations: [
    DataGridComponent,
    ErrorCardComponent,
  ],
  exports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    DataGridComponent,
    ErrorCardComponent,
 ],
  providers: [
    NotifyService,
    FavoriteService,
  ]
})
export class SharedModule { }
