import { ProxyService } from './serial/config/proxy.service';
import { SerialDialogView } from './serial/serial.dialog';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DroneService } from './drone/drone.service';

export abstract class Dash {

  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog,
    protected droneService: DroneService
    ) {
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
    this.droneService.refreshParameters(null)
  }

}
