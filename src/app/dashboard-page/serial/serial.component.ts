import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
// import { WebSocketAPI} from './webSocketAPI'
// import { from } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import {ConfigService} from './config/config.service'
import { ProxyService } from './config/proxy.service';
import { DroneService, DroneEventListener } from './config/drone.service';

import {MatDialogRef, MatDialogActions} from "@angular/material";




@Component({
  selector: 'app-root',
  templateUrl: './serial.component.html',
  styleUrls: ['./serial.component.css']
})
export class SerialDialogView {

  title = 'app';

  portslist: string[] = [];

  @ViewChild("portname", {static: false})
  public portname: ElementRef;

  @ViewChild("portbaud", {static: false})
  public portbaud: ElementRef;


  constructor(private dialogRef: MatDialogRef<SerialDialogView>,
              private proxyService: ProxyService){
    this.proxyService.getPostList(data => {
        console.log(data)
        console.log(data.ports)
        this.portslist = data.ports;
    })
  }

  disconnect() {
    this.proxyService.disconnect()
  }

  connect() { 
    this.proxyService.setPortName(this.portname.nativeElement.value);
    if (this.portbaud.nativeElement.value != "")
      this.proxyService.setBaud(this.portbaud.nativeElement.value)

    this.proxyService.connect(this.printer);
    this.dialogRef.close()
  }

  printer (data) {
    console.log(data)
  }

  close() {
    this.dialogRef.close()
  }

}