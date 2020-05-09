import {Component} from '@angular/core'

import { ProxyService } from './serial/config/proxy.service';
import { Dash } from './dashboard-page.component';
import { MatDialog } from '@angular/material';
import { DroneService } from './drone/drone.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.mobile.css']
})
export class DashMobile extends Dash {

  constructor(public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService)
  {
    super(proxyService, dialog, droneService)
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
