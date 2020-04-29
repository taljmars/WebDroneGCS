import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../drone/drone.service';



@Component({
  selector: 'app-root',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogView implements DroneEventListener{

  events: any[] = [];

  constructor(private droneService: DroneService){
    this.droneService.addEventListener(this);
  }

  onDroneEvent(event: any) {
    this.events.push({
      date: new Date(),
      type: event.name,
      message: JSON.stringify(event.data)
    })
  }

}