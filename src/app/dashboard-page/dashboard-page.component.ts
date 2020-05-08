import {Component, NgModule, VERSION, OnInit, ViewChild} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
// import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
//         BingMapAPILoaderConfig, BingMapAPILoader, 
//         GoogleMapAPILoader,  GoogleMapAPILoaderConfig
// } from 'angular-maps';
import { ProxyService } from './serial/config/proxy.service';

// import { SerialStatView } from './serial/serial.stat';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class Dash {

  // @ViewChild("frame", {static: false})
  // public frame: MatSelect;
  

  constructor(public proxyService: ProxyService) {
  }

}
