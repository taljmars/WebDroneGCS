import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService, DroneEventListener } from 'src/app/services/drone/drone.service';
import { DroneEvent, DroneEvents } from 'src/app/services/drone/protocol/events.component';


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
  public flightMode1: any;
  public flightMode2: any;
  public flightMode3: any;
  public flightMode4: any;
  public flightMode5: any;
  public flightMode6: any;

  public channel7: any
  public channel8: any

  constructor(public proxyService: ProxyService,
    public droneService: DroneService){

      droneService.addEventListener(this)
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
          this.flightMode1 = data.fltMode1.mode;
          this.flightMode2 = data.fltMode2.mode;
          this.flightMode3 = data.fltMode3.mode;
          this.flightMode4 = data.fltMode4.mode;
          this.flightMode5 = data.fltMode5.mode;
          this.flightMode6 = data.fltMode6.mode;

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

}
