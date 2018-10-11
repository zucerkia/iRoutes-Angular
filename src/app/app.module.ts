import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpw8_DUvYrhlxDSWVzOGw0fQCGyuNMVC0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
