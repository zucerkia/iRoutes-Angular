import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'



import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AgmCoreModule, GoogleMapsAPIWrapper  } from '@agm/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// import {MatIconModule} from '@angular/material/icon';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatSidenavModule} from '@angular/material/sidenav';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    SidenavComponent,
    CardComponent
  ],
  imports: [
    // MatToolbarModule,
    // MatSidenavModule,
    // MatIconModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBXmelsDTehzI1LkStgd9bVg_b0F-_bJXc'
    })
  ],
  providers: [
    GoogleMapsAPIWrapper 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
