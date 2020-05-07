import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import { DroneService } from '../dashboard-page/drone/drone.service';
import { ProxyService } from '../dashboard-page/serial/config/proxy.service';
import { UserService } from '../user.service';
import { ApiService } from '../api.service'
import { ApplicationStateService } from '../application-state.service';
import { AlertsService } from '../alerts.service';
import { AppToolbar } from './app.toolbar'

@Component({
  selector: 'my-toolbar-mobile',
  templateUrl: './app.toolbar.mobile.html',
  styleUrls: ['./app.toolbar.css']
})
export class AppToolbarMobile extends AppToolbar {
  
  public menuOpen: boolean = false;

  constructor ( protected router: Router, 
                protected dialog: MatDialog, 
                public applicationStateService: ApplicationStateService,
                protected droneService: DroneService,
                protected proxyService: ProxyService,
                public userService: UserService,
                protected api: ApiService,
                protected alertsService: AlertsService,
              ) {
    super(router, dialog, applicationStateService, droneService, proxyService, userService, api, alertsService)
  }

  openMenu() {
    this.menuOpen = true
  }

  hideMenu() {
    this.menuOpen = false
  }
}
