import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidenavComponent
  ],
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
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
