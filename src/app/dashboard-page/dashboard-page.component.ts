import { ProxyService } from '../services/config/proxy.service';
import { SerialDialogView } from './serial/serial.dialog';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DroneService, DroneEventListener } from '../services/drone/drone.service';
import { DroneEvent, DroneEvents } from '../services/drone/protocol/events.component';

export abstract class Dash implements DroneEventListener {

  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService
    ) 
  {
    droneService.addEventListener(this)
  }

  onDroneEvent(event: DroneEvent) {
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

}
