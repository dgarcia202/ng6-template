import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule } from '@angular/material';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule, 
    MatIconModule    
  ],
  exports: [ LayoutComponent ],
  declarations: [ LayoutComponent ]
})
export class LayoutModule { }
