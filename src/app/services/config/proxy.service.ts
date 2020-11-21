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
  private pingId: number = 0;

  private listeners: Set<ProxyListener> = new Set<ProxyListener>();
  private proxyConnected: boolean = false
  private proxyUp: any = true;
  public baudlist: Array<Number> = new Array(57600,115200);
  public proxyUpTime: String = "00:00:00";
  public proxyVersion: String = "Unknown";
  public proxyAddresses: Array<String> = new Array();
  public proxyConnectedUsers: any = new Array();

  constructor(private configService: ConfigService,
    private alertsService: AlertsService) {
    this.pingProxyService()
    setInterval(() => {
      this.pingProxyService()
    },
    1 * 1000);
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
      that.configService.post("/connection/connect", {}, data, val => {
        that.portName = val.connection.name;
        if (that.portName == "")
          that.portName = "Unknown"
        that.baudRate = val.connection.baud;
        for (let x of that.listeners)
              x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_CONNECTED, "Proxy Binded to Port"))

        console.log("Connected")
        if (callback) callback(val)
      })

    }, function(error) {
      if (!that.proxyConnected)
        return
      that.portName = "Unknown";
      that.baudRate = 0;
      for (let x of that.listeners)
            x.onProxyEvent(new ProxyEvent(ProxyEvents.PROXY_DOWN, "Proxy Disconnected"))
      that.alertsService.promptError(error)
      that.pingProxyService();
    });
  }

  closeConnection() {
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
  }

  disconnect(callback: Function = null) {
    this.configService.post("/connection/disconnect", {}, {}, val => {
      this.closeConnection()
      if (callback) callback(val)
    },
    err => {
      console.error("Failed to call disconnet, do it forcly: " + err)
      this.closeConnection()
    })
    
  }

  getPortName() {
      return this.portName;
  }

  getBaudRate() {
    return this.baudRate;
  }

  getPostList(callback: Function) {
      this.configService.get("/connection/listports", {}, {}, callback);
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

  pingProxyService(successHandler = null, errorHandler = null) {
    this.configService.get("/connection/ping?id=" + this.pingId++, {}, {}, 
    data => {
      this.proxyUp = true
      this.proxyVersion = data["version"];
      this.proxyUpTime = data["uptime"];
      this.proxyAddresses = data["addresses"]
      this.proxyConnectedUsers = data["connectedUsers"]
      let connection = data["connection"];
      if (!this.isProxyConnected() && connection["drone"] == true) {
        console.log("Proxy already binded to port and drone")
        this.portName = connection["port"]
        this.baudRate = connection["baud"]
        this.connect(this.portName, this.baudRate);
      }
      // console.log("Proxy service successfully found")
      if (successHandler)
        successHandler(data)
    }, 
    data => {
      this.proxyUp = false
      this.proxyVersion = "Unknown"
      this.proxyUpTime = "00:00:00"
      this.proxyAddresses = new Array()
      if (errorHandler)
        errorHandler(data)
      // console.error("Failed to find proxy service")
    });
  }

}
