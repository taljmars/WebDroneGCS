import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { SerialDialogView } from "../dashboard-page/serial/serial.dialog"
import { DroneEventListener, DroneService } from '../services/drone/drone.service';
import { ProxyListener, ProxyService } from '../services/config/proxy.service';
import { UserService } from '../services/users/user.service';
import { DroneEvents } from '../services/drone/protocol/events.component';
import { ApiService } from '../services/api.service'
import { ApplicationStateService } from '../application-state.service';
import { AlertsService } from '../services/alerts.service';
import { AppConstants } from '../local.storage';

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
          AppConstants.MyStorage.remove(AppConstants.General.REMEMBER_USER)
          console.log("Complete Logout")
          this.router.navigateByUrl('/');
      },
      e => {
        // alert(r.error.error);
        this.alertsService.promptError("Failed to logout")
        this.userService.removeToken();
        AppConstants.MyStorage.remove(AppConstants.General.REMEMBER_USER)
        console.log("Complete Logout")
        this.router.navigateByUrl('/');
      }
    );
  }

  isRootPath() {
    return location.pathname == '/';
  }

  toggleFullScreen() {
    var elem = document.documentElement;

    if (this.isFullScreen()) {
      document.exitFullscreen();
    }
    else {
      elem.requestFullscreen();
    }
  }

  isFullScreen() {
    // if((document.fullscreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
    if(document.fullscreen) {
      return true;
    }
    return false
  }

  isLandscape() {
    return window.orientation != 0
    // return window.orientation == 0
  }

}
