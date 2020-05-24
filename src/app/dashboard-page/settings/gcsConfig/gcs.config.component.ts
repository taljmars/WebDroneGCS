import { Component, OnInit , ViewChild, ElementRef, Input} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/users/user.service';
import { DroneService } from 'src/app/services/drone/drone.service';


export class GcsConfig {

  // @ViewChild("proxyAddress", {static: false})
  @Input() public proxyAddress: any = '';

  // @ViewChild("proxyPort", {static: false})
  @Input() public proxyPort: any = 0;

  @Input() public modeStatus: any = 0;
  @Input() public alt: any = 0;
  @Input() public sensors: any = 0;
  @Input() public pos: any = 0;
  @Input() public rc: any = 0;
  @Input() public controller: any = 0;

  events: string[] = [];

  constructor(public droneService: DroneService, public proxyService: ProxyService, public configService: ConfigService, public alertService: AlertsService, public userService: UserService){
    this.proxyAddress = configService.getAddress()
    this.proxyPort = configService.getPort()
    this.droneService.getStreamRate(
      data => {
        this.modeStatus = data.modeStatus;
        this.alt = data.alt;
        this.pos = data.pos;
        this.rc = data.rc;
        this.sensors = data.sensors;
        this.controller = data.controller;
      },
      data => {
        console.error("Failed to get stream rates")
      }
    )
  }

  onUpdate() {
    if (this.proxyService.isProxyConnected()) {
      this.alertService.promptError("Proxy Connected, Please disconnect first")
      return
    }
    // this.configService.setAddress(this.proxyAddress.nativeElement.value)
    // this.configService.setPort(this.proxyPort.nativeElement.value)
    this.configService.setAddress(this.proxyAddress)
    this.configService.setPort(this.proxyPort)
    
    // this.userService.setProxyAddress(this.proxyAddress.nativeElement.value)
    // this.userService.setProxyPort(this.proxyPort.nativeElement.value)
    this.userService.setProxyAddress(this.proxyAddress)
    this.userService.setProxyPort(this.proxyPort)
  }

  updateStreamRates() {
    this.droneService.setStreamRate(
      this.alt,
      this.pos,
      this.modeStatus,
      this.rc,
      this.sensors,
      this.controller,
      data => this.alertService.promptSuccess("Stream rates were succussfully updated"), 
      data => this.alertService.promptError("Failed to update stream rates")
    )
    console.error("Update Stream Rates")
  }
}


@Component({
  selector: 'gcs-config-mobile',
  templateUrl: './gcs.config.component.html',
  styleUrls: ['./gcs.config.mobile.css']
})
export class GcsConfigMobile extends GcsConfig {

  constructor(public droneService: DroneService, public proxyService: ProxyService, public configService: ConfigService, public alertService: AlertsService, public userService: UserService){
    super(droneService,proxyService,configService, alertService, userService)
  }

  ngAfterViewInit() {
    var elements, name, arr;
    elements = document.getElementsByClassName("panel-sm");
    console.log(elements)
    name = "col";
    for (let element of elements) {
      arr = element.className.split(" ");
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
      }
    }

    elements = document.getElementsByClassName("panel-md");
    console.log(elements)
    name = "col";
    for (let element of elements) {
      arr = element.className.split(" ");
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
      }
    }
  }

}

@Component({
  selector: 'gcs-config-desktop',
  templateUrl: './gcs.config.component.html',
  styleUrls: ['./gcs.config.desktop.css']
})
export class GcsConfigDesktop extends GcsConfig {

  constructor(public droneService: DroneService, public proxyService: ProxyService, public configService: ConfigService, public alertService: AlertsService, public userService: UserService){
    super(droneService,proxyService,configService, alertService, userService)
  }

  ngAfterViewInit() {
    var elements, name, arr;
    elements = document.getElementsByClassName("panel-sm");
    console.log(elements)
    name = "col-6 col-lg-4";
    for (let element of elements) {
      arr = element.className.split(" ");
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
      }
    }

    elements = document.getElementsByClassName("panel-md");
    console.log(elements)
    name = "col-12 col-lg-8";
    for (let element of elements) {
      arr = element.className.split(" ");
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
      }
    }

    elements = document.getElementsByClassName("dash-row");
    console.log(elements)
    name = "row";
    for (let element of elements) {
      arr = element.className.split(" ");
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
      }
    }
  }
  
}
