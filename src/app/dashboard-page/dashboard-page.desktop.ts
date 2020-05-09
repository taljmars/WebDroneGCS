import {Component} from '@angular/core'

import { ProxyService } from './serial/config/proxy.service';
import { Dash } from './dashboard-page.component';
import { MatDialog } from '@angular/material';
import { DroneService } from './drone/drone.service';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.desktop.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashDesktop extends Dash {
  
  constructor(
    public proxyService: ProxyService,
    protected dialog: MatDialog,
    public droneService: DroneService
    ) 
  {
    super(proxyService, dialog, droneService)
  }

}
