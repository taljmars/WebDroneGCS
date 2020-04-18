import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ProxyListener, ProxyService } from './proxy.service';

export interface DroneEventListener {
    call(event: any);
}

@Injectable({
  providedIn: 'root'
})
export class DroneService implements ProxyListener {

  listeners: Set<DroneEventListener> = new Set();

    constructor(private proxyService: ProxyService) { 
      this.proxyService.addEventListner(this);
    }
  
    call(event: any) {
        for (let listener of this.listeners)
          listener.call(event)     
    }

    addEventListener(droneEventListener: DroneEventListener ) {
        this.listeners.add(droneEventListener);
    }

    removeEventListener(droneEventListener: DroneEventListener ) {
      this.listeners.delete(droneEventListener);
    }
}