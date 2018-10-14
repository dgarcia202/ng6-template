import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from './framework/layout/layout.module';
import { ListViewModule } from './framework/list-view/list-view.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ListViewModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
