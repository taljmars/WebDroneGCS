import { ProxyService } from './serial/config/proxy.service';
import { SerialDialogView } from './serial/serial.dialog';
import { MatDialogConfig, MatDialog } from '@angular/material';

export abstract class Dash {

  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog) {
  }

  openSerialDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.

    this.dialog.open(SerialDialogView, dialogConfig);
  }

}
