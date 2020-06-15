import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService, DroneEventListener } from 'src/app/services/drone/drone.service';
import { DroneEvent, DroneEvents } from 'src/app/services/drone/protocol/events.component';
import { AlertsService } from 'src/app/services/alerts.service';
import { ApplicationStateService } from 'src/app/application-state.service';


export abstract class Calibration implements DroneEventListener  {

  events: string[] = [];

  modesList: string[] = []
  commandList: string[] = []
  tuneList: string[] = []

  vali: string = "aa"

  private static cbFltMode1Min = 0;
  private static cbFltMode1Max = 1230;
  private static cbFltMode2Min = 1231;
  private static cbFltMode2Max = 1360;
  private static cbFltMode3Min = 1361;
  private static cbFltMode3Max = 1490;
  private static cbFltMode4Min = 1491;
  private static cbFltMode4Max = 1620;
  private static cbFltMode5Min = 1621;
  private static cbFltMode5Max = 1749;
  private static cbFltMode6Min = 1755;
  private static cbFltMode6Max = 2200;

  public activeMode = -1;
  public flightMode1 = {mode: null, simple:null, superSimple:null};
  public flightMode2 = {mode: null, simple:null, superSimple:null};
  public flightMode3 = {mode: null, simple:null, superSimple:null};
  public flightMode4 = {mode: null, simple:null, superSimple:null};
  public flightMode5 = {mode: null, simple:null, superSimple:null};
  public flightMode6 = {mode: null, simple:null, superSimple:null};

  public channel6 = {tune: null, min: null, max: null};

  public channel7 = {cmd: null};
  public channel8 = {cmd: null};

  public calibrationGyroMessege: String = ""
  public calibrationLevelMessege: String = ""

  private static CALIBRATE_GYRO: String = "Calibrate Gyro"
  private static CALIBRATE_ACK: String = "Ack"
  public gyroAction: String = Calibration.CALIBRATE_GYRO;
  private calibGyroStarted: Boolean = false;

  public ch: Array<String> = []

  constructor(
    public proxyService: ProxyService,
    public droneService: DroneService,
    public alertsService: AlertsService,
    public applicationStateService: ApplicationStateService){

      droneService.addEventListener(this)
      for (let i = 0 ; i < 8 ; i++) {
          this.ch.push("1500")
      }
      droneService.getModesOptions(
        data => {
          // console.log(data)
          data.modes.forEach(element => {
            this.modesList.push(element)
          });              
        },
        () => console.error("Failed to get modes")
      )
      droneService.getCommandsOptions(
        data => {
          // console.log(data)
          data.commands.forEach(element => {
            this.commandList.push(element)
          });              
        },
        () => console.error("Failed to get commands")
      )
      droneService.getTuneOptions(
        data => {
          // console.log(data)
          data.tunes.forEach(element => {
            this.tuneList.push(element)
          });            
        },
        () => console.error("Failed to get tunes")
      )
      droneService.getModes(
        data => {
          console.log(data)
          this.flightMode1 = data.fltMode1;
          this.flightMode2 = data.fltMode2;
          this.flightMode3 = data.fltMode3;
          this.flightMode4 = data.fltMode4;
          this.flightMode5 = data.fltMode5;
          this.flightMode6 = data.fltMode6;

          this.channel6 = data.ch6;

          this.channel7 = data.ch7;
          this.channel8 = data.ch8;

        },
        () => console.error("Failed to get current mode")
      )
  }

  onDroneEvent(event: DroneEvent) {
    if (!Object.values(DroneEvents).includes(event.id)) {
      console.log("Unknown " + event)
      return
    }
    

    switch (event.id) {
      case DroneEvents.RC_IN:
        this.activeMode = Calibration.getCurrentActiveLabel(event.data['4']);
        this.ch = event.data
        break;
      case DroneEvents.CALIBRATION_IMU:
        this.calibrationGyroMessege = event.data.message
        if (event.data.iscalibrate == true) {
          this.calibGyroStarted = true;
          this.gyroAction = Calibration.CALIBRATE_ACK
        }
        else {
          this.calibGyroStarted = false;
          this.gyroAction = Calibration.CALIBRATE_GYRO
        }
        break;
    }
  }
  

  static getCurrentActiveLabel(ch5) {
    if (Calibration.checkBound(ch5, Calibration.cbFltMode1Min, Calibration.cbFltMode1Max))
        return 1;
    if (Calibration.checkBound(ch5, Calibration.cbFltMode2Min, Calibration.cbFltMode2Max))
        return 2;
    if (Calibration.checkBound(ch5, Calibration.cbFltMode3Min, Calibration.cbFltMode3Max))
        return 3;
    if (Calibration.checkBound(ch5, Calibration.cbFltMode4Min, Calibration.cbFltMode4Max))
        return 4;
    if (Calibration.checkBound(ch5, Calibration.cbFltMode5Min, Calibration.cbFltMode5Max))
        return 5;
    if (Calibration.checkBound(ch5, Calibration.cbFltMode6Min, Calibration.cbFltMode6Max))
        return 6;

    return -1;
  }

  private static checkBound(val, min, max) {
    if (min == val || max == val)
        return true;

    if (min < val && val < max)
        return true;

    return false;
  }

  startGyroCalibrate() {
    if (this.calibGyroStarted) {
      this.droneService.ackGyroCalibrate(
        data=> {
          if (!data.result)
            this.calibrationGyroMessege = data.messege
        },
        () => {
          this.calibrationGyroMessege = "Failed to execute calibration procedure"
        }
      )
    }
    else {
      this.droneService.startGyroCalibrate(
        data=> {
          if (!data.result)
            this.calibrationGyroMessege = data.messege
        },
        () => {
          this.calibrationGyroMessege = "Failed to start calibration procedure"
        }
      )
    }
  }

  startLevelCalibrate() {
    this.droneService.startLevelCalibrate(
      data=> {
        if (!data.result)
          this.calibrationLevelMessege = data.messege
        else
          this.calibrationLevelMessege = "Done"
      },
      () => {
        this.calibrationLevelMessege = "Failed to start calibration procedure"
      }
    )
  }

  updateSelection(flightMode: any, field: string, newmode: String) {
    console.log("Select " + flightMode + " " + field + " " + newmode)
    flightMode[field] = newmode
    this.sendModes()
  }

  sendModes() {
    this.droneService.setModes(
      {
        "fltMode1": this.flightMode1,
        "fltMode2": this.flightMode2,
        "fltMode3": this.flightMode3,
        "fltMode4": this.flightMode4,
        "fltMode5": this.flightMode5,
        "fltMode6": this.flightMode6,
        "ch6": this.channel6,
        "ch7": this.channel7,
        "ch8": this.channel8
      },
      data => console.log("Successfully update modes"),
      () => this.alertsService.promptError("Failed to update modes")
    )
  }

}
