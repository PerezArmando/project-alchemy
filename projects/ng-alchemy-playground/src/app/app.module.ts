import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgAlchemyLibModule } from 'projects/ng-alchemy-lib/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAlchemyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
