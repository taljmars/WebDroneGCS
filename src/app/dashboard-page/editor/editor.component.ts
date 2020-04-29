import {Component, NgModule, VERSION, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
        BingMapAPILoaderConfig, BingMapAPILoader, 
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import { DroneService, DroneEventListener } from '../drone/drone.service';
import { DroneEvents } from '../drone/protocol/events.component';

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',

  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class Editor implements DroneEventListener {
  
  _lat: Number = 0;
  _lon: Number = 0;

  constructor(private droneService: DroneService) {
    droneService.addEventListener(this)
  }

  // private _options: IMapOptions = {
  //   disableBirdseye: false,
  //   disableStreetside: false,
  //   navigationBarMode: 1, 
  //   zoom: 6
  // };

  _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.FontMarker,
    fontName: 'FontAwesome',
    fontSize: 48,
    color: 'red',
    text: '+'    
  };
  
  onDroneEvent(event: any) {
    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    
    switch (event.id) {
      case DroneEvents.GPS:
        console.log("GPS " + event.data)
        this._lat = event.data['lat'];
        this._lon = event.data['lon'];
        break;

      case DroneEvents.CONNECTED:
        console.log("Connected " + event.data)
        break;

      case DroneEvents.DISCONNECTED:
        console.log("Disconnect " + event.data)
        break;

      case DroneEvents.TEXT_MESSEGE:
        console.log("Text-Message " + event.data)
        break;

      default:
        console.log("Unknown " + event)
    }
  }

}
