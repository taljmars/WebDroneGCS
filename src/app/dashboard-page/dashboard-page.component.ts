import { ProxyService } from '../services/config/proxy.service';
import { SerialDialogView } from './serial/serial.dialog';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DroneService, DroneEventListener } from '../services/drone/drone.service';
import { DroneEvent, DroneEvents } from '../services/drone/protocol/events.component';
import { AlertsService } from '../services/alerts.service';
import { UserService } from '../services/users/user.service';
import { ConfigService } from '../services/config/config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../local.storage';

export abstract class Dash implements DroneEventListener {

  public paramReceived: Number = 100;
  
  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService,
    public alertsService: AlertsService,
    public userService: UserService,
    protected router: Router,
    ) 
  {    
    droneService.addEventListener(this)
    this.alertsService.promptSuccess("Welcome " + userService.getUserName())
  }

  public counter: number = 0;
  onDroneEvent(event: DroneEvent) {
    switch (event.id) {
      case DroneEvents.PARAMS_START:
        this.paramReceived = 0;
        this.counter = 0
        break;
      case DroneEvents.PARAM_RECEIVE:
        this.counter++
        this.paramReceived = this.counter / event.data.amount * 100
        break;
      case DroneEvents.PARAMS_END:
        this.paramReceived = 100;
        break;
    }
  }

  openSerialDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.

    this.dialog.open(SerialDialogView, dialogConfig);
  }

  getPortName() {
    if (this.proxyService.isProxyConnected())
      return this.proxyService.getPortName()
    else
      return "Unknown"
  }

  getBaudRate() {
    if (this.proxyService.isProxyConnected())
      return this.proxyService.getBaudRate()
    else
      return "Unknown"
  }

  refreshParams() {
    this.droneService.refreshParameters()
  }

  goToSettings() {
    AppConstants.MyStorage.remove(AppConstants.General.ROUTE_FROM_LOGIN)
    this.router.navigateByUrl('/settings');  
  }

  hide(frame) {
    AppConstants.MyStorage.remove(AppConstants.General.ROUTE_FROM_LOGIN)
    frame.hide()
  }

  isRouteFromLogin() {
    if (AppConstants.MyStorage.get(AppConstants.General.ROUTE_FROM_LOGIN) != null) {
      return true;
    }

    return false;
  }

}
