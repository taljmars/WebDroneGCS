import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../drone/drone.service';



@Component({
  selector: 'app-root',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class Settings implements DroneEventListener{

  private active: String = "DroneParams"

  constructor(private droneService: DroneService){
    this.droneService.addEventListener(this);
  }

  onDroneEvent(event: any) {
  }

  setActive(view: String) {
    this.active = view
  }

  isActive(view: String) {
    return this.active == view
  }

}