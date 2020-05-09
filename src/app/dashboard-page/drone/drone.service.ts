import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ProxyListener, ProxyService } from '../serial/config/proxy.service';
import { DroneEvents, DroneEvent } from './protocol/events.component';
import { ConfigService } from '../serial/config/config.service';
import { ProxyEvent, ProxyEvents } from '../serial/config/proxy-events/events.component';

export interface DroneEventListener {
    onDroneEvent(event: DroneEvent);
}

@Injectable({
  providedIn: 'root'
})
export class DroneService implements ProxyListener {

  listeners: Map<String, DroneEventListener> = new Map();
  
  public firmwareType: String = "Unknown";
  public firmwareVersion: String = "Unknown";
  public droneType: String = "Unknown";

    constructor(private proxyService: ProxyService,
                private configService: ConfigService) { 
      this.proxyService.addEventListner(this);
    }
  
    private notify(event: any) {
      if (!Object.values(DroneEvents).includes(event.id)) {
        console.error("Unknown " + event)
        return
      }

      let droneEvent = new DroneEvent(event.id, event.data)

      switch (droneEvent.id) {
        case DroneEvents.PARAMS_START:
          console.log("Start receiving parameters")
          break;
        case DroneEvents.PARAMS_END:
          console.log("Finish receiving parameters")
          this.getInfo()
          break;
        case DroneEvents.DISCONNECTED:
          this.proxyService.disconnect()
          break;
      }
      
      for (let listener of this.listeners.values())
        listener.onDroneEvent(droneEvent)     
    }

    onProxyEvent(event: ProxyEvent) {
      switch (event.id) {
        case ProxyEvents.PROXY_CONNECTED:
          this.proxyService.subscribe("/topic/events/drone", val => this.notify(JSON.parse(val.body)))
          this.proxyService.subscribe("/topic/events/port", val => this.notify(JSON.parse(val.body)))
          this.getInfo()
          break
        case ProxyEvents.PROXY_DISCONNECTED:
        case ProxyEvents.PROXY_DOWN:
          this.proxyService.unsubscribe("/topic/events/drone")
          this.proxyService.unsubscribe("/topic/events/port")
          break
      }
  }

    addEventListener(droneEventListener: DroneEventListener ) {
        this.listeners.set(droneEventListener.constructor.name, droneEventListener);
    }

    removeEventListener(droneEventListener: DroneEventListener ) {
      this.listeners.delete(droneEventListener.constructor.name);
    }

    getStatistics(callback: Function) {
      this.configService.get("stat", {}, {}, callback);
    }

    refreshParameters() {
      console.log("Refresh Parameters")
      this.configService.get("refreshParameters", {}, {}, a => null);
    }

    fetchWaypoints(callback: Function) {
      this.configService.get("fetchWaypoints", {}, {}, callback);
    }

    getMavlinkVersion(callback: Function) {
      this.configService.get("getMavlinkVersion", {}, {}, callback);
    }

    getParametersList(callback: Function) {
      this.configService.get("getParametersList", {}, {}, callback);
    }

    private getInfo() {
      this.configService.get("info", {}, {}, data => {
        this.droneType = data.type;
        this.firmwareVersion = data.firmware.version;
        this.firmwareType = data.firmware.type;
      });
    }

}