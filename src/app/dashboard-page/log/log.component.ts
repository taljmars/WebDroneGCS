import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvent, DroneEvents } from '../../services/drone/protocol/events.component';



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

  onDroneEvent(event: DroneEvent) {
    this.events.push({
      date: new Date(),
      type: DroneEvents[event.id],
      message: JSON.stringify(event.data)
    })
  }

}