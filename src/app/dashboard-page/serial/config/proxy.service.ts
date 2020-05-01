import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ConfigService } from './config.service';

export interface ProxyListener {
    onProxyEvent(event: any);
}

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
    
  private ws: any = {};
  private portName: String = "";
  private baudRate: Number = 0;

  private listeners: Set<ProxyListener> = new Set<ProxyListener>();
  private proxyConnected: boolean = false
  private proxyUp: boolean = false
  public baudlist: Array<Number> = new Array(57600,115200);

  constructor(private configService: ConfigService) {
    this.pingProxyService();
  }

  connect(portname: String, baudrate: Number, callback: Function = null) {
    //connect to stomp where stomp endpoint is exposed
    let socket = new SockJS("http://localhost:8080/greeting");
    // let socket = new WebSocket("ws://localhost:8080/greeting");
    this.ws = Stomp.over(socket);
    this.ws.debug = null
    let that = this;
    this.ws.connect({}, function(frame) {
      that.proxyConnected = true;
      for (let x of that.listeners)
        x.onProxyEvent("Proxy is Up")

        that.ws.subscribe("/errors", function(message) {
        for (let x of that.listeners)
            x.onProxyEvent("Proxy Error: " + message)
      });      
    }, function(error) {
      that.portName = "";
      that.baudRate = 0;
      for (let x of that.listeners)
            x.onProxyEvent("Proxy Disconnected")
      this.alertsService.openSnackBar(error)
      that.pingProxyService();
    });

    let data = {
        'name' : portname,
    }
    if (baudrate != 0)
      data['baud'] = baudrate;

    console.log(data)
    this.configService.post("connect", {}, data, val => {
      this.portName = val.connection.name;
      this.baudRate = val.connection.baud;
      for (let x of this.listeners)
            x.onProxyEvent("Proxy Binded to Port")
      if (callback) callback(val)
    })
  }

  disconnect(callback: Function = null) {
    this.configService.post("disconnect", {}, {}, val => {
      this.portName = "";
      this.baudRate = 0;
      for (let x of this.listeners)
        x.onProxyEvent("Proxy Un-binded to Port")
      if (callback) callback(val)
    })
    if (this.ws != null) {
      this.ws.ws.close();
    }
    console.log("Disconnected");
  }

  getPortName() {
      return this.portName;
  }

  getBaudRate() {
    return this.baudRate;
  }

  getPostList(callback: Function) {
      this.configService.get("listports", {}, {}, callback);
  }

  addEventListner(listner: ProxyListener) {
      this.listeners.add(listner)
  }

  removeEventListner(listener: ProxyListener) {
      this.listeners.delete(listener);
  }

  subscribe(queue: string, notify: Function) {
    if (this.ws == {}) {
      console.error("WS wasn't initialized")
      return
    }

    if (!this.ws.connected) {
      console.error("WS isn't connected")
      return
    }
    this.ws.subscribe(queue, notify);
  }

  unsubscribe(queue: string) {
    if (this.ws == {}) {
      console.error("WS wasn't initialized")
      return
    }

    if (!this.ws.connected) {
      console.error("WS isn't connected")
      return
    }
    this.ws.unsubscribe(queue);      
  }

  isProxyConnected() {
    return this.proxyConnected;
  }

  isProxyUp() {
    return this.proxyUp;
  }

  pingProxyService() {
    this.configService.get("ping", {}, {}, 
    data => {
      this.proxyUp = true
      console.log("Proxy service successfully found")
    }, 
    data => {
      this.proxyUp = false
      console.error("Failed to find proxy service")
    });
  }

}
