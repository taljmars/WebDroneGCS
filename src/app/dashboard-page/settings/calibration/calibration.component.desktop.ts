import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Calibration } from './calibration.component';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService } from 'src/app/services/drone/drone.service';


@Component({
  selector: 'calibration-desktop',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.desktop.css']
})
export class CalibrationDesktop extends Calibration {

  events: string[] = [];

  constructor(public proxyService: ProxyService, public droneService: DroneService){
    super(proxyService, droneService)
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
