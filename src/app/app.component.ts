import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SerialDialogView} from "./dashboard-page/serial/serial.component"
import { DroneEventListener, DroneService } from './dashboard-page/serial/config/drone.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DroneEventListener {
  
  title = 'WebDroneGCS';
  connected: boolean = false;

  constructor (private router: Router, private dialog: MatDialog, private droneService: DroneService) {
    droneService.addEventListener(this)
  }

  connect() {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      // dialogConfig.

      this.dialog.open(SerialDialogView, dialogConfig);
  }

  call(event: any) {
    this.connected = true
  }

  getConnectedStyles() {
    let styles = {
      'color': this.connected ? 'lime' : 'grey',
      'font-weight' : this.connected ? 'bold' : 'normal',
    };
    return styles;
  }
}
