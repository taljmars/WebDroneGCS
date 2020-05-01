import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SerialDialogView} from "./dashboard-page/serial/serial.component"
import { DroneEventListener, DroneService } from './dashboard-page/drone/drone.service';
import { ProxyListener, ProxyService } from './dashboard-page/serial/config/proxy.service';
import { UserService } from './user.service';
import { DroneEvents } from './dashboard-page/drone/protocol/events.component';
import { ApiService } from './api.service'
import { ApplicationStateService } from './application-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements ProxyListener, DroneEventListener {
  
  title = 'WebDroneGCS';
  connected: boolean = false;

  constructor ( private router: Router, 
                private dialog: MatDialog, 
                public applicationStateService: ApplicationStateService,
                private droneService: DroneService,
                private proxyService: ProxyService,
                public userService: UserService,
                private api: ApiService,
              ) {
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
    this.droneService.refreshParameters(a => null)
  }

  onProxyEvent(event: any) {
    if (event == "Proxy Disconnected" || event == "Proxy Un-binded to Port")
      this.connected = false
    else
      this.connected = true
  }

  onDroneEvent(event: any) {
    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    
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

  logout() {
    console.log("Logout")
    this.api.logout(
      this.userService.getToken()
    )
    .subscribe(
      r => {
          this.userService.removeToken();
          this.router.navigateByUrl('/');
      },
      r => {
        alert(r.error.error);
        this.userService.removeToken();
        this.router.navigateByUrl('/');
      }
    );
  }
}
