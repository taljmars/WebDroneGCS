import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from './../serial/config/drone.service';



@Component({
  selector: 'app-root',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogView implements DroneEventListener{

  events: string[] = [];

  constructor(private droneService: DroneService){
    this.droneService.addEventListener(this);
  }

  call(event: any) {
    this.events.push(event)
  }

}