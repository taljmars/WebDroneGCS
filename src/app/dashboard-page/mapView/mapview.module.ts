/// <reference path="../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />


import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,   
        DocumentRef, MapServiceFactory, 
        BingMapAPILoaderConfig, BingMapAPILoader, 
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import { MapView } from './mapview.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  imports: [
    BrowserModule,
    MapModule.forRootBing(),
    DropdownModule.forRoot(),
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatGridListModule,
  ],
  declarations: [ MapView ],
  providers: [
    { 
      provide: MapAPILoader, deps: [], useFactory: BingMapServiceProviderFactory
    }
  ],
  exports: [MapView],
  // bootstrap: [  ]
  bootstrap: [ MapView ]
})
export class MapViewModule {
  constructor() {console.log("In MapViewModule constructor");}
}

export function BingMapServiceProviderFactory(){
    console.log("Creating BingMapServiceProviderFactory - in dashboard");
    let bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
    // bc.apiKey ="Ap0AObt84NcDaUThCeWOj52ZqUHv6k4TJhjLibR-DghC-semgoj-0uPbIi8r0E4j"; 
    
    // Mine
    bc.apiKey ="Ai-xda--3CqrRCA0uoLXy0zZKFnOmsSBERI-K8Ul3AT_cUSW1z0-4KaAV-MxytIW"; 
    
      // replace with your bing map key
      // the usage of this key outside this plunker is illegal. 
    bc.branch = "experimental"; 
      // to use the experimental bing brach. There are some bug fixes for
      // clustering in that branch you will need if you want to use 
      // clustering.
    return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}

// export function GoogleMapServiceProviderFactory(){
//     const gc: GoogleMapAPILoaderConfig = new GoogleMapAPILoaderConfig();
//     gc.apiKey = 'AIzaSyDe2QqXrbtaORvL-I0WHpiI72HxtfTz5Zo';
//       // replace with your google map key
//       // the usage of this key outside this plunker is illegal. 
//     gc.enableClustering = true;
//     return new GoogleMapAPILoader(gc, new WindowRef(), new DocumentRef());
// }


