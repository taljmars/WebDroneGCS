import {Component} from '@angular/core'

import { ProxyService } from './serial/config/proxy.service';
import { Dash } from './dashboard-page.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard-page.mobile.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashMobile extends Dash {

  constructor(public proxyService: ProxyService,
    protected dialog: MatDialog) {
    super(proxyService, dialog)
  }

}
