/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { ButtonsModule, WavesModule, CardsModule } from 'angular-bootstrap-md'
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
// import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,   
        // DocumentRef, MapServiceFactory, 
        // BingMapAPILoaderConfig, BingMapAPILoader, 
        // GoogleMapAPILoader,  GoogleMapAPILoaderConfig
// } from 'angular-maps';
import { DashMobile } from './dashboard-page.mobile';
import { DashDesktop } from './dashboard-page.desktop';
import { MatCardModule } from '@angular/material/card';
import { SerialModule } from './serial/serial.module';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule, IconsModule, ChartsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    SerialModule,

    BrowserModule,
    // MapModule.forRootBing(),
    MatCardModule,

    ModalModule, TooltipModule, PopoverModule, IconsModule,

    CardsModule, WavesModule, ButtonsModule, ChartsModule,

    MatProgressBarModule,

  ],
  declarations: [ DashDesktop, DashMobile ],
  providers: [
    // { 
      // provide: MapAPILoader, deps: [], useFactory: BingMapServiceProviderFactory
    // }
  ],
  // exports: [Dash],
  bootstrap: [  ]
  // bootstrap: [ Dash ]
})
export class DashModule {
  constructor() {console.log("In DashModule constructor");}
}

// export function BingMapServiceProviderFactory(){
//     console.log("Creating BingMapServiceProviderFactory - in dashboard");
//     let bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
//     // bc.apiKey ="Ap0AObt84NcDaUThCeWOj52ZqUHv6k4TJhjLibR-DghC-semgoj-0uPbIi8r0E4j"; 
    
//     // Mine
//     bc.apiKey ="Ai-xda--3CqrRCA0uoLXy0zZKFnOmsSBERI-K8Ul3AT_cUSW1z0-4KaAV-MxytIW"; 
    
//       // replace with your bing map key
//       // the usage of this key outside this plunker is illegal. 
//     bc.branch = "experimental"; 
//       // to use the experimental bing brach. There are some bug fixes for
//       // clustering in that branch you will need if you want to use 
//       // clustering.
//     return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
// }

// export function GoogleMapServiceProviderFactory(){
//     const gc: GoogleMapAPILoaderConfig = new GoogleMapAPILoaderConfig();
//     gc.apiKey = 'AIzaSyDe2QqXrbtaORvL-I0WHpiI72HxtfTz5Zo';
//       // replace with your google map key
//       // the usage of this key outside this plunker is illegal. 
//     gc.enableClustering = true;
//     return new GoogleMapAPILoader(gc, new WindowRef(), new DocumentRef());
// }


