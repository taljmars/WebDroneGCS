import { Component, OnInit , ViewChild, ElementRef, Input} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/users/user.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { GcsConfig } from './gcs.config.component'

@Component({
  selector: 'gcs-config-desktop',
  templateUrl: './gcs.config.component.html',
  styleUrls: ['./gcs.config.component.desktop.css']
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
