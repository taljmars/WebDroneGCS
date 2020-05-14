import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { CamView } from './camview.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';

import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,   
  DocumentRef, MapServiceFactory, 
  BingMapAPILoaderConfig, BingMapAPILoader, 
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

@NgModule({
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserModule,
    MapModule.forRootBing(),
  ],
  declarations: [ CamView ],
  providers: [],
  exports: [CamView],
  // bootstrap: [ ]
  bootstrap: [ CamView ]
})
export class CamViewModule {
  constructor() {console.log("In CamViewModule constructor");}
}
