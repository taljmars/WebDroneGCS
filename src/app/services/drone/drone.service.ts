import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';
import { ProxyListener, ProxyService } from '../config/proxy.service';
import { DroneEvents, DroneEvent } from './protocol/events.component';
import { ConfigService } from '../config/config.service';
import { ProxyEvent, ProxyEvents } from '../config/proxy-events/events.component';

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
  public refreshparam: Boolean;
  public gcsid: Number = 0;
  public heartbeatinterval: Number = 1;

  public myMap: Map<string, string> = new Map()

    constructor(private proxyService: ProxyService,
                private configService: ConfigService) { 
      this.proxyService.addEventListner(this);
    }
  
    private notify(event: any) {
      if (!Object.values(DroneEvents).includes(event.id)) {
        console.error("Unknown " + event)
        return
      }

      let that = this
      let droneEvent = new DroneEvent(event.id, event.data, event.timestamp)

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
        case DroneEvents.PARAMETER:
        case DroneEvents.PARAM_RECEIVE:
          break
        default:
          Object.keys(droneEvent.data).forEach(function(key) {
            // console.table('Key : ' + key + ', Value : ' + event.data[key])
            that.myMap.set(key, droneEvent.data[key])
          })
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
      this.configService.get("/connection/stat", {}, {}, callback);
    }

    refreshParameters() {
      console.log("Refresh Parameters")
      this.configService.get("/configuration/refreshParameters", {}, {}, a => null);
    }

    fetchWaypoints(callback: Function) {
      this.configService.get("/configuration/fetchWaypoints", {}, {}, callback);
    }

    getMavlinkVersion(callback: Function) {
      this.configService.get("/connection/getMavlinkVersion", {}, {}, callback);
    }

    getParametersList(callback: Function) {
      this.configService.get("/configuration/getParametersList", {}, {}, callback);
    }

    sendParameter(name: String, value: any, callback: Function) {
      this.configService.post("/configuration/sendParameter", {}, {name: name, value: value}, callback)
    }

    private getInfo() {
      this.configService.get("/connection/info", {}, {}, data => {
        this.droneType = data.type;
        this.firmwareVersion = data.firmware.version;
        this.firmwareType = data.firmware.type;
        this.gcsid = data.protocol.gcsid;
        this.heartbeatinterval = data.protocol.heartbeatinterval
        this.refreshparam = data.protocol.refreshparam
      });
    }

    setStreamRate(alt: Number, position: Number, modeStatus: Number, rc: Number, sensors: Number, controller: Number, okCallback: Function, errCallback: Function) {
      let req = {
        alt: alt
      , pos: position
      , modeStatus: modeStatus
      , rc: rc
      , sensors: sensors
      , controller: controller
      }

      this.configService.post("/configuration/setStreamRates", {}, req, okCallback, errCallback);
    }

    getStreamRate(okCallback: Function, errCallback: Function) {
      this.configService.get("/configuration/getStreamRates", {}, {}, okCallback, errCallback);
    }

    getModesOptions(okCallback: Function, errCallback: Function) {
      this.configService.get("/configuration/getModesOptions", {}, {}, okCallback, errCallback);
    }

    getTuneOptions(okCallback: Function, errCallback: Function) {
      this.configService.get("/configuration/getTuneOptions", {}, {}, okCallback, errCallback);
    }

    getCommandsOptions(okCallback: Function, errCallback: Function) {
      this.configService.get("/configuration/getCommandsOptions", {}, {}, okCallback, errCallback);
    }

    getModes(okCallback: Function, errCallback: Function) {
      this.configService.get("/configuration/getModes", {}, {}, okCallback, errCallback);
    }

    setModes(data: any, okCallback?: Function, errCallback?: Function) {
      this.configService.post("/configuration/setModes", {}, data, okCallback, errCallback);
    }

    startEscCalibrate(okCallback?: Function, errCallback?: Function) {
      this.configService.post("/calibration/startEscCalibrate", {}, {}, okCallback, errCallback);
    }

    startGyroCalibrate(okCallback: Function, errCallback: Function) {
      this.configService.post("/calibration/startGyroCalibrate", {}, {}, okCallback, errCallback);
    }

    ackGyroCalibrate(okCallback: Function, errCallback: Function) {
      this.configService.post("/calibration/ackGyroCalibrate", {}, {}, okCallback, errCallback);
    }

    startLevelCalibrate(okCallback?: Function, errCallback?: Function) {
      this.configService.post("/calibration/startLevelCalibrate", {}, {}, okCallback, errCallback);
    }

    getSupportCompassMethods(okCallback: Function, errCallback?: Function) {
      this.configService.get("/calibration/getSupportCompassMethods", {}, {}, okCallback, errCallback);
    }

    setMagnometerCalibrateMethod(method, okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/setMagnometerCalibrateMethod", {}, {"data":method}, okCallback, errCallback);
    }

    setMagnometerCalibrateRotation(rotation, okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/setMagnometerCalibrateRotation", {}, { "data": rotation}, okCallback, errCallback);
    }

    startMagnometerCalibrate(okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/startMagCalibrate", {}, {}, okCallback, errCallback);
    }

    stopMagnometerCalibrate(okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/stopMagCalibrate", {}, {}, okCallback, errCallback);
    }

    startRCCalibrate(okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/startRCCalibrate", {}, {}, okCallback, errCallback);
    }

    stopRCCalibrate(okCallback: Function, errCallback?: Function) {
      this.configService.post("/calibration/stopRCCalibrate", {}, {}, okCallback, errCallback);
    }

    
    
}