import {Component} from '@angular/core'

import { ProxyService } from '../services/config/proxy.service';
import { Dash } from './dashboard-page.component';
import { MatDialog } from '@angular/material';
import { DroneService } from '../services/drone/drone.service';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.desktop.css']
})
export class DashDesktop extends Dash {
  
  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService
    ) 
  {
    super(proxyService, dialog, droneService)
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
