import {Component, ViewChild, ElementRef, Inject, Input} from '@angular/core'
import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvents } from '../../services/drone/protocol/events.component';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory, 
  BingMapAPILoaderConfig, BingMapAPILoader, 
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';
import { AlertsService } from 'src/app/services/alerts.service';

/// https://x-team.com/blog/webcam-image-capture-angular/

@Component({
  selector: 'cam-view',
  // selector: 'app-root',
  templateUrl: './camview.component.html',
  styleUrls: ['./camview.component.css']
})
export class CamView implements DroneEventListener {

  @ViewChild("video", {static: false})
  public video: ElementRef;
  _lat: Number = 32.0920566;
  _lon: Number = 34.8181581;

  @Input() cameraOnly: boolean = false; 

  public mode: String = "Unknown";
  public battery: String = "0";
  public signal: String = "0";
  public speed: Number = 0;
  public height: String = "0";
  public fixType: String = "0";
  public dist: String = "0";

  @Input() public infoHide: Boolean = false;

  constructor(private droneService: DroneService, private alertsService: AlertsService) {
    this.droneService.addEventListener(this)
  }

  angle: any = 0

  markers: Set<any> = new Set()

  private videoStreams: Array<any> = new Array()
  private currentStreamIdx = 0;

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

  updateDeviceList(that, arr) {
    return device => {
      // that.alertsService.promptSuccess()
      // if (device.kind === 'videoinput') {
        console.log(device.kind + ": " + device.label + "  id = " + device.deviceId);
        arr.push({label: device.label, id: device.deviceId});
      // }
    }
  }

  onDroneEvent(event: any) {
    if (this.cameraOnly)
      return

    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    
    switch (event.id) {
      case DroneEvents.GPS:
        this.height = event.data['gps-alt'];
        this.fixType = event.data['gps-fixtype'] + " (" + event.data['gps-sat'] + ")"
        break;

      case DroneEvents.CONNECTED:
        this.alertsService.promptSuccess("Drone Connected")
        break;

      case DroneEvents.STATE:
        this.mode = event.data["mode"]
        break;

      case DroneEvents.MODE:
        this.mode = event.data["name"]
        break;

      case DroneEvents.BATTERY:
        this.battery = event.data["bat-remain"]
        break;

      case DroneEvents.RADIO:
        this.signal = event.data["radio-signal"]
        break;

      case DroneEvents.DISCONNECTED:
        this.alertsService.promptError("Drone Disconnected")
        break;

      case DroneEvents.TEXT_MESSEGE:
        this.alertsService.promptInfo(event.data["text"])
        break;

      case DroneEvents.SPEED:
        this.speed = Math.round(event.data["speed-air"] * 3.6 * 10) / 10
        break;

      case DroneEvents.HOME:
        this.dist = event.data["home-dist"]
        break;

      case DroneEvents.NAVIGATION:
        this.angle = event.data["nav-bearing"]
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

  public ngAfterViewInit() {
    console.log("After view init - talma")

    let that = this;

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    
      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        devices.forEach(that.updateDeviceList(that, that.videoStreams));
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });

    }

    this.toggleVideoStream()
  }

  toggleVideoStream() {
    console.log("Toggle Screen")
    this.currentStreamIdx += 1
    let dev = this.videoStreams[this.currentStreamIdx % this.videoStreams.length]
    if (dev == null) {
      this.video.nativeElement.srcObject = null
      return
    }

    const constraints = {
      video: {deviceId: dev.id ? {exact: dev.id} : undefined}
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      console.log("Stream" + stream)
      this.video.nativeElement.srcObject = stream
      this.video.nativeElement.play();
      this.alertsService.promptInfo("Video Input: " + dev.label)

    })
    .catch(e => console.error("Failed to toggle to device " + dev.label + " " + e))
  }

  hideInfo() {
    this.infoHide = true
  }

  showInfo() {
    this.infoHide = false
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
