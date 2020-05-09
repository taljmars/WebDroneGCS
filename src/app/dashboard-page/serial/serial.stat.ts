import { Component} from '@angular/core';

import { ProxyService } from './config/proxy.service';
import { DroneService } from '../drone/drone.service';


@Component({
  selector: 'serial-stat',
  templateUrl: './serial.stat.html',
  styleUrls: ['./serial.component.css']
})
export class SerialStatView {

  receivedBytes: Number = 0;
  transmittedBytes: Number = 0;
  receivedBytesPerSecond: Number = 0;
  transmittedBytesPerSecond: Number = 0;
  receivedPackets: Number = 0;
  receivedErrorPackets: Number = 0;
  receivedUncategorizedPackets: Number = 0;
  lostPackets: Number = 0;
  transmittedPackets: Number = 0;
  transmittedErrorPackets: Number = 0;
  receivedPacketsPerSecond: Number = 0;
  transmittedPacketsPerSecond: Number = 0;
  latency: Number = 0;
  mavlinkVersion: String = "";

  constructor(public proxyService: ProxyService,
              public droneService: DroneService){
    
      setInterval(() => 
        {
          if (this.proxyService.isProxyConnected()) {
            this.droneService.getStatistics(data => this.updateStats(data));
            this.droneService.getMavlinkVersion(data => this.mavlinkVersion = data.message)
          }
          else {
            this.resetStats();
          }
        }, 
        1000
      )
  }

  resetStats() {
    this.receivedBytes = 0;
    this.transmittedBytes = 0;
    this.receivedBytesPerSecond = 0;
    this.transmittedBytesPerSecond = 0;
    this.receivedPackets = 0;
    this.receivedErrorPackets = 0;
    this.receivedUncategorizedPackets = 0;
    this.lostPackets = 0;
    this.transmittedPackets = 0;
    this.transmittedErrorPackets = 0;
    this.receivedPacketsPerSecond = 0;
    this.transmittedPacketsPerSecond = 0;
    this.latency = 0;
    this.mavlinkVersion = "";
  }

  updateStats(data) {
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

}