import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Calibration } from './calibration.component';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ApplicationStateService } from 'src/app/application-state.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'calibration-mobile',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.mobile.css']
})
export class CalibrationMobile extends Calibration {

  events: string[] = [];

  constructor(public proxyService: ProxyService, public droneService: DroneService,
    public alertsService: AlertsService,
    public applicationStateService: ApplicationStateService,
    public dialog: MatDialog){
    super(proxyService, droneService,alertsService,applicationStateService, dialog)
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
