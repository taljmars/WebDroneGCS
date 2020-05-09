import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import { DroneService } from '../services/drone/drone.service';
import { ProxyService } from '../services/config/proxy.service';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service'
import { ApplicationStateService } from '../application-state.service';
import { AlertsService } from '../services/alerts.service';
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
