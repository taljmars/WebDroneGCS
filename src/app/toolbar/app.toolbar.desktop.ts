import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { ApiService } from '../services/api.service'
import { ApplicationStateService } from '../application-state.service';
import { AlertsService } from '../services/alerts.service';
import { AppToolbar } from './app.toolbar'
import { SerialDialogView } from "../dashboard-page/serial/serial.dialog"
import { DroneEventListener, DroneService } from '../services/drone/drone.service';
import { ProxyListener, ProxyService } from '../services/config/proxy.service';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { DroneEvents, DroneEvent } from '../services/drone/protocol/events.component';
import { ProxyEvent, ProxyEvents } from '../services/config/proxy-events/events.component';
import { DroneScannerService } from '../dashboard-page/serial/dronescanner.service';

@Component({
  selector: 'my-toolbar-desktop',
  templateUrl: './app.toolbar.desktop.html',
  styleUrls: ['./app.toolbar.css']
})
export class AppToolbarDesktop extends AppToolbar implements DroneEventListener, ProxyListener {
  
  constructor ( protected router: Router, 
                protected dialog: MatDialog, 
                public applicationStateService: ApplicationStateService,
                protected droneService: DroneService,
                protected proxyService: ProxyService,
                public userService: UserService,
                protected api: ApiService,
                protected alertsService: AlertsService,
                public droneScannerService: DroneScannerService,
              ) {
    super(router, dialog, applicationStateService, droneService, proxyService, userService, api, alertsService, droneScannerService)
    proxyService.addEventListner(this)
    droneService.addEventListener(this)
  }

  connect() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.

    this.dialog.open(SerialDialogView, dialogConfig);
  }

  sync() {
    this.droneService.refreshParameters()
  }

  onProxyEvent(event: ProxyEvent) {
    switch (event.id) {
      case ProxyEvents.PROXY_DISCONNECTED:
      case ProxyEvents.PROXY_DOWN:
        this.connected = false
        break;
      case ProxyEvents.PROXY_CONNECTED:
        this.connected = true
        break;
    }
  }

  onDroneEvent(event: DroneEvent) {    
    switch (event.id) {
      case DroneEvents.HEARTBEAT_TIMEOUT:
        console.log("HEARTBEAT_TIMEOUT " + event.data)
        this.connected = false;
        break;
      case DroneEvents.HEARTBEAT_RESTORED:
        console.log("HEARTBEAT_RESTORED " + event.data)
        this.connected = true;
        break;
    }
  }

  getConnectedStyles() {
    let styles = {
      'color': this.connected ? 'lime' : 'grey',
      'font-weight' : this.connected ? 'bold' : 'normal',
    };
    return styles;
  }

}
