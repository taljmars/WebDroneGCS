import {Component, NgModule, VERSION, OnInit, ViewChild, ElementRef} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
        BingMapAPILoaderConfig, BingMapAPILoader, 
        GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvents, DroneEvent } from '../../services/drone/protocol/events.component';

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',

  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapView implements DroneEventListener {
  
  _lat: Number = 32.0920566;
  _lon: Number = 34.8181581;

  @ViewChild("video", {static: false})
  public video: ElementRef;

  mode: String = "Unknown"
  signal: Number = 0
  battery: Number = 0
  ftime: String = "00:00:00"
  height: Number = 0
  distance: Number = 0
  speed: Number = 0
  angle: any = 0

  markers: Set<any> = new Set()

  constructor(private droneService: DroneService) {
    droneService.addEventListener(this)
  }

  _options: IMapOptions = {
    // disableBirdseye: true,
    // disableStreetside: true,
    // navigationBarMode: 2, 
    // showBreadcrumb: true,
    // showCopyright: true,
    // showScalebar: true,
    zoom: 15
  };

  // private _iconInfo: IMarkerIconInfo = {
  //   markerType: MarkerTypeId.FontMarker,
  //   fontName: 'FontAwesome',
  //   fontSize: 48,
  //   color: 'red',
  //   text: '+'    
  // };

  _iconInfo: IMarkerIconInfo = {
    markerType: MarkerTypeId.CanvasMarker,
    rotation: this.angle,
    drawingOffset: { x: 12, y: 0 },
    points: [
      { x: 5, y: 20 },
      { x: 12, y: 15 },
      { x: 19, y: 20 },
      { x: 12, y: 0 }
    ],
    color: '#f00',
    size: { width: 24, height: 24 }
};

  public ngAfterViewInit() {
    console.log("After view init - talma")
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              // this.video.nativeElement.src = window.URL.createObjectURL(stream);
              this.video.nativeElement.srcObject = stream
              this.video.nativeElement.play();
          });
      }
  }
  
  onDroneEvent(event: DroneEvent) {
    switch (event.id) {
      case DroneEvents.GPS:
        // console.log("GPS " + event.data)
        this._lat = event.data['lat'];
        this._lon = event.data['lon'];
        this.height = event.data['alt'];
        break;

      // case DroneEvents.CONNECTED:
      //   console.log("Connected " + event.data)
      //   break;

      case DroneEvents.STATE:
        this.mode = event.data["mode"]
        break;

      case DroneEvents.MODE:
        this.mode = event.data["name"]
        // console.log("mode " + event.data)
        break;

      case DroneEvents.BATTERY:
        this.battery = event.data["remain"]
        // console.log("battery " + event.data)
        break;

      case DroneEvents.RADIO:
        this.signal = event.data["signal"]
        // console.log("radio " + event.data)
        break;

      case DroneEvents.DISCONNECTED:
        // console.log("Disconnect " + event.data)
        break;

      case DroneEvents.TEXT_MESSEGE:
        // console.log("Text-Message " + event.data)
        break;

      case DroneEvents.SPEED:
        // console.log("Speed " + event.data)
        this.speed = Math.round(event.data["airspeed"] * 3.6 * 10) / 10
        break;

      case DroneEvents.NAVIGATION:
        // console.log("braing " + event.data["bearing"])
        this.angle = event.data["bearing"]
        this.markers.clear()
        this._iconInfo.rotation = this.angle;
        this.markers.add({
          lat: this._lat,
          lon: this._lon,
          iconInfo: this._iconInfo,
        })
        break;

      // default:
        // console.log("Unknown " + event)
    }
  }

}
