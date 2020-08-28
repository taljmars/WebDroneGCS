import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvent } from '../../services/drone/protocol/events.component';
import { ApplicationStateService } from 'src/app/application-state.service';



@Component({
  selector: 'app-root',
  templateUrl: './monitor.html',
  styleUrls: ['./monitor.css']
})
export class MonitorView implements DroneEventListener {

  private active: String = "OpenChart"
  // private active: String = "ServoOutput"



  constructor(private droneService: DroneService, public applicationStateService: ApplicationStateService){
    this.droneService.addEventListener(this);
  }

  onDroneEvent(event: DroneEvent) {
  }

  setActive(view: String) {
    this.active = view
  }

  isActive(view: String) {
    return this.active == view
  }

}