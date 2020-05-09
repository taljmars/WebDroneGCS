import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SerialDialogView } from "../dashboard-page/serial/serial.dialog"
import { DroneEventListener, DroneService } from '../services/drone/drone.service';
import { ProxyListener, ProxyService } from '../services/config/proxy.service';
import { UserService } from '../services/user.service';
import { DroneEvents } from '../services/drone/protocol/events.component';
import { ApiService } from '../services/api.service'
import { ApplicationStateService } from '../application-state.service';
import { AlertsService } from '../services/alerts.service';

export abstract class AppToolbar {
  
  title = 'WebDroneGCS';
  connected: boolean = false;

  constructor ( protected router: Router, 
                protected dialog: MatDialog, 
                public applicationStateService: ApplicationStateService,
                protected droneService: DroneService,
                protected proxyService: ProxyService,
                public userService: UserService,
                protected api: ApiService,
                protected alertsService: AlertsService,
              ) {
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
        // alert(r.error.error);
        this.alertsService.openSnackBar("Failed to logout")
        this.userService.removeToken();
        this.router.navigateByUrl('/');
      }
    );
  }

}
