import {Component} from '@angular/core'

import { ProxyService } from '../services/config/proxy.service';
import { Dash } from './dashboard-page.component';
import { MatDialog } from '@angular/material';
import { DroneService } from '../services/drone/drone.service';
import { AlertsService } from '../services/alerts.service';
import { UserService } from '../services/users/user.service';
import { ConfigService } from '../services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.mobile.css']
})
export class DashMobile extends Dash {

  constructor(public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService, 
    public alertsService: AlertsService,
    public userService: UserService,
    protected router: Router,
    )
  {
    super(proxyService, dialog, droneService, alertsService, userService, router)
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

    elements = document.getElementsByClassName("panel-lg");
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
