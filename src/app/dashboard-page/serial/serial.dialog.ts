import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
// import { WebSocketAPI} from './webSocketAPI'
// import { from } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {ConfigService} from './config/config.service'
import { ProxyService } from './config/proxy.service';
import { DroneService, DroneEventListener } from '../drone/drone.service';

import {MatDialogRef, MatDialogActions} from "@angular/material";
import {MatSelect} from '@angular/material/select';




@Component({
  selector: 'serial-dialog',
  templateUrl: './serial.dialog.html',
  styleUrls: ['./serial.component.css']
})
export class SerialDialogView {

  title = 'app';

  portslist: string[] = [];

  @ViewChild("portname", {static: false})
  public portname: MatSelect;

  @ViewChild("portbaud", {static: false})
  public portbaud: MatSelect;

  constructor(public dialogRef: MatDialogRef<SerialDialogView>,
              public proxyService: ProxyService,
              public droneService: DroneService){
    this.proxyService.getPostList(data => {
        console.log(data)
        console.log(data.ports)
        this.portslist = data.ports;
    })

  }

  disconnect() {
    this.proxyService.disconnect()
    this.dialogRef.close()
  }

  connect() { 
    let portname = this.portname.value;
    let baud = this.portbaud.value;
    this.proxyService.connect(portname, baud)
    
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }

}