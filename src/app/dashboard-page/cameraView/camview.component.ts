import {Component, ViewChild, ElementRef} from '@angular/core'
import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvents } from '../../services/drone/protocol/events.component';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
  BingMapAPILoaderConfig, BingMapAPILoader, 
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

/// https://x-team.com/blog/webcam-image-capture-angular/

@Component({
  // selector: 'dash-frame',
  selector: 'app-root',
  templateUrl: './camview.component.html',
  styleUrls: ['./camview.component.css']
})
export class CamView implements DroneEventListener {

  @ViewChild("video", {static: false})
  public video: ElementRef;
  _lat: Number = 32.0920566;
  _lon: Number = 34.8181581;

  public mode: String = "Unknown";
  public battery: String = "0";
  public signal: String = "0";
  public speed: Number = 0;
  public height: String = "0";

  constructor(private droneService: DroneService) {
    this.droneService.addEventListener(this)
  }

  angle: any = 0

  markers: Set<any> = new Set()

  _options: IMapOptions = {
    // disableBirdseye: true,
    // disableStreetside: true,
    // navigationBarMode: 2, 
    // showBreadcrumb: true,
    // showCopyright: true,
    // showScalebar: true,
    showDashboard: false,
    zoom: 15
  };

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

  onDroneEvent(event: any) {
    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    
    switch (event.id) {
      case DroneEvents.GPS:
        // console.log("GPS " + event.data)
        // this._lat = event.data['lat'];
        // this._lon = event.data['lon'];
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
        // this.angle = event.data["bearing"]
        // this.markers.clear()
        // this._iconInfo.rotation = this.angle;
        // this.markers.add({
        //   lat: this._lat,
        //   lon: this._lon,
        //   iconInfo: this._iconInfo,
        // })
        break;

      // default:
        // console.log("Unknown " + event)
    }
  }

  public ngAfterViewInit() {
    console.log("After view init - talma")

      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        
        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
          devices.forEach(function(device) {
            console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
          });
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
        
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            // this.video.nativeElement.src = window.URL.createObjectURL(stream);
            this.video.nativeElement.srcObject = stream
            this.video.nativeElement.play();
        });
      }
  }

  toggleFullScreen() {
    var elem = document.documentElement;

    if (this.isFullScreen()) {
      document.exitFullscreen();
    }
    else {
      elem.requestFullscreen();
    }
  }

  isFullScreen() {
    if((document.fullscreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
      return true;
    }
    return false
  }

  isLandscape() {
    return window.orientation != 0
    // return window.orientation == 0
  }
}
