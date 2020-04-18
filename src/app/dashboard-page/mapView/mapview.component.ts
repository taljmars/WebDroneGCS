import {Component, NgModule, VERSION, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
        BingMapAPILoaderConfig, BingMapAPILoader, 
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import { DroneService, DroneEventListener } from '../serial/config/drone.service';

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',

  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapView implements DroneEventListener {

  constructor(private droneService: DroneService) {
    droneService.addEventListener(this)
  }
  
  call(event: any) {
    throw new Error("Method not implemented.");
  }

}
