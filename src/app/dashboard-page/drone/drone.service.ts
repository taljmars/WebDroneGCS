import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ProxyListener, ProxyService } from '../serial/config/proxy.service';
import { DroneEvents } from './protocol/events.component';
import { ConfigService } from '../serial/config/config.service';

export interface DroneEventListener {
    onDroneEvent(event: any);
}

@Injectable({
  providedIn: 'root'
})
export class DroneService implements ProxyListener {

  listeners: Map<String, DroneEventListener> = new Map();

    constructor(private proxyService: ProxyService,
                private configService: ConfigService) { 
      this.proxyService.addEventListner(this);
    }
  
    notify(event: any) {
      if (event.id == DroneEvents.DISCONNECTED)
        this.proxyService.disconnect()

      for (let listener of this.listeners.values())
        listener.onDroneEvent(event)     
    }

    onProxyEvent(event: any) {
      // this.notify(event)
      if (event == "Proxy is Up") {
        this.proxyService.subscribe("/topic/events/drone", val => this.notify(JSON.parse(val.body)))
        this.proxyService.subscribe("/topic/events/port", val => this.notify(JSON.parse(val.body)))
      }
      else if (event == "Proxy is Down") {
        this.proxyService.unsubscribe("/topic/events/drone")
        this.proxyService.unsubscribe("/topic/events/port")
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

    refreshParameters(callback: Function) {
      this.configService.get("refreshParameters", {}, {}, callback);
    }

    fetchWaypoints(callback: Function) {
      this.configService.get("fetchWaypoints", {}, {}, callback);
    }

    getMavlinkVersion(callback: Function) {
      this.configService.get("getMavlinkVersion", {}, {}, callback);
    }

    getParameters(callback: Function) {
      this.configService.get("getParameters", {}, {}, callback);
    }

}