import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListViewComponent } from './list-view.component';

import { MatTableModule, MatPaginatorModule, MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material'


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [ListViewComponent],
  exports: [ ListViewComponent ]
})
export class ListViewModule { }
