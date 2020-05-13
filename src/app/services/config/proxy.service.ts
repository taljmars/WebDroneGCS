import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ConfigService } from './config.service';

import { ProxyEvent, ProxyEvents } from './proxy-events/events.component'
import { AlertsService } from 'src/app/services/alerts.service';

export interface ProxyListener {
    onProxyEvent(event: ProxyEvent);
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
  public proxyUpTime: String = "00:00:00";
  public proxyVersion: String = "Unknown";

  constructor(private configService: ConfigService,
    private alertsService: AlertsService) {
    setInterval(() => {
      this.pingProxyService()
    },
    2 * 1000);
  }

  connect(portname: String, baudrate: Number, callback: Function = null) {
    //connect to stomp where stomp endpoint is exposed
    let socket = new SockJS(this.configService.getUrl() + "greeting");
    // let socket = new WebSocket("ws://localhost:8080/greeting");
    this.ws = Stomp.over(socket);
    this.ws.debug = null
    let that = this;
    this.ws.connect({}, function(frame) {
      that.proxyConnected = true;
      for (let x of that.listeners)
        x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_UP, "Proxy is Up"))

      that.ws.subscribe("/errors", function(message) {
      for (let x of that.listeners)
        x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_ERROR, "Proxy Error: " + message))
      });

      console.log("Socket Binded")
      let data = {
        'name' : portname,
      }
      if (baudrate != 0)
        data['baud'] = baudrate;

      console.log(data)
      that.configService.post("connect", {}, data, val => {
        that.portName = val.connection.name;
        that.baudRate = val.connection.baud;
        for (let x of that.listeners)
              x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_CONNECTED, "Proxy Binded to Port"))

        console.log("Connected")
        if (callback) callback(val)
      })

    }, function(error) {
      if (!that.proxyConnected)
        return
      that.portName = "";
      that.baudRate = 0;
      for (let x of that.listeners)
            x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_DOWN, "Proxy Disconnected"))
      that.alertsService.openSnackBar(error)
      that.pingProxyService();
    });
  }

  disconnect(callback: Function = null) {
    this.configService.post("disconnect", {}, {}, val => {
      this.portName = "";
      this.baudRate = 0;
      this.proxyConnected = false;
      for (let x of this.listeners)
        x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_DISCONNECTED, "Proxy Un-binded to Port"))

      if (this.ws != null) {
        this.ws.ws.close();
        // this.ws = null;
      }
      console.log("Disconnected");
      if (callback) callback(val)
    })
    
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
      this.proxyVersion = data["version"];
      this.proxyUpTime = data["uptime"];
      let connection = data["connection"];
      if (!this.isProxyConnected() && connection["drone"] == true) {
        console.log("Proxy already binded to port and drone")
        this.portName = connection["port"]
        this.baudRate = connection["baud-rate"]
        this.connect(this.portName, this.baudRate);
      }
      // console.log("Proxy service successfully found")
    }, 
    data => {
      this.proxyUp = false
      this.proxyVersion = "Unknown"
      this.proxyUpTime = "00:00:00"
      // console.error("Failed to find proxy service")
    });
  }

}
