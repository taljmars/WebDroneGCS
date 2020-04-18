import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SerialDialogView} from "./dashboard-page/serial/serial.component"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebDroneGCS';

  constructor (private router: Router, private dialog: MatDialog) {

  }

  connect() {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // dialogConfig.

      this.dialog.open(SerialDialogView, dialogConfig);
  }
}
