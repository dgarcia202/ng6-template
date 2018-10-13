import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [ LayoutComponent ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
