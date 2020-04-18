import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ConfigService } from './config.service';

export interface ProxyListener {
    call(event: any);
}

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

    ws: any;
    portName: String = "";
    baudRate: Number = 0;

    listeners: Set<ProxyListener> = new Set<ProxyListener>()

    constructor(private configService: ConfigService) {}

    connect(callback: Function = null) {
        //connect to stomp where stomp endpoint is exposed
        let socket = new SockJS("http://localhost:8080/greeting");
        // let socket = new WebSocket("ws://localhost:8080/greeting");
        this.ws = Stomp.over(socket);
        let that = this;
        this.ws.connect({}, function(frame) {
          that.ws.subscribe("/errors", function(message) {
            alert("Error " + message.body);
          });
          that.ws.subscribe("/topic/events/drone", function(message) {
            console.log(message)
            for (let x of that.listeners)
                x.call(message.body)
          });
          that.ws.subscribe("/topic/events/port", function(message) {
            console.log(message)
            // that.showEvents(message.body);
          });
          
        }, function(error) {
          alert("STOMP error " + error);
        });

        let data = {
            'name' : this.portName,
          }
          if (this.baudRate != 0)
            data['baud'] = this.baudRate;
      
          console.log(data)
          this.configService.post("connect", {}, data, callback)
      }

      disconnect() {
        if (this.ws != null) {
          this.ws.ws.close();
        }
        console.log("Disconnected");
      }

      setPortName(value: String) {
            this.portName = value;
        }

        setBaud(value: Number) {
            this.baudRate = value;
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
}
