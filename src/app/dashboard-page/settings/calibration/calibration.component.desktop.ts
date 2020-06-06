import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Calibration } from './calibration.component';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService } from 'src/app/services/drone/drone.service';


@Component({
  selector: 'calibration-desktop',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.desktop.css']
})
export class CalibrationDesktop extends Calibration {

  events: string[] = [];

  constructor(public proxyService: ProxyService, public droneService: DroneService){
    super(proxyService, droneService)
  }

}
