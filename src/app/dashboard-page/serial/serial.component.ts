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
  selector: 'app-root',
  templateUrl: './serial.component.html',
  styleUrls: ['./serial.component.css']
})
export class SerialDialogView {

  title = 'app';

  portslist: string[] = [];

  @ViewChild("portname", {static: false})
  public portname: MatSelect;

  @ViewChild("portbaud", {static: false})
  public portbaud: MatSelect;

  private receivedBytes: Number = 0;
  private transmittedBytes: Number = 0;
  private receivedBytesPerSecond: Number = 0;
  private transmittedBytesPerSecond: Number = 0;
  private receivedPackets: Number = 0;
  private receivedErrorPackets: Number = 0;
  private receivedUncategorizedPackets: Number = 0;
  private lostPackets: Number = 0;
  private transmittedPackets: Number = 0;
  private transmittedErrorPackets: Number = 0;
  private receivedPacketsPerSecond: Number = 0;
  private transmittedPacketsPerSecond: Number = 0;
  private latency: Number = 0;
  private mavlinkVersion: String = "";

  constructor(private dialogRef: MatDialogRef<SerialDialogView>,
              private proxyService: ProxyService,
              private droneService: DroneService){
    this.proxyService.getPostList(data => {
        console.log(data)
        console.log(data.ports)
        this.portslist = data.ports;
    })

    if (this.proxyService.isConnected()) {
      setInterval(() => {
        this.droneService.getStatistics(data => this.printer(data));
        this.droneService.getMavlinkVersion(data => this.mavlinkVersion = data.message)
      }, 1000)
    }
  }

  printer(data) {
    this.receivedBytes = data['connection']['receivedBytes']
    this.transmittedBytes = data['connection']['transmittedBytes']
    this.receivedBytesPerSecond = data['connection']['receivedBytesPerSecond']
    this.transmittedBytesPerSecond = data['connection']['transmittedBytesPerSecond']
    this.receivedPackets = data['connection']['receivedPackets']
    this.receivedErrorPackets = data['connection']['receivedErrorPackets']
    this.receivedUncategorizedPackets = data['connection']['receivedUncategorizedPackets']
    this.lostPackets = data['connection']['lostPackets']
    this.transmittedPackets = data['connection']['transmittedPackets']
    this.transmittedErrorPackets = data['connection']['transmittedErrorPackets']
    this.receivedPacketsPerSecond = data['connection']['receivedPacketsPerSecond']
    this.transmittedPacketsPerSecond = data['connection']['transmittedPacketsPerSecond']
    this.latency = data['connection']['latency']
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