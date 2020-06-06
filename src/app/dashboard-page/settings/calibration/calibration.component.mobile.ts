import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { Calibration } from './calibration.component';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { DroneService } from 'src/app/services/drone/drone.service';


@Component({
  selector: 'calibration-mobile',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.mobile.css']
})
export class CalibrationMobile extends Calibration {

  events: string[] = [];

  constructor(public proxyService: ProxyService, public droneService: DroneService){
    super(proxyService, droneService)
  }

}
