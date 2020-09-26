import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../../../services/drone/drone.service';
import { DroneEvent, DroneEvents, DroneEventMap } from '../../../services/drone/protocol/events.component';



@Component({
  selector: 'logs',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogView implements DroneEventListener{

  events: any[] = [];

  filteredResults: any[] = []

  eventTypes = [
    { 
      category: 'generic', 
      items: [
        { name: 'test' },
      ]
    }, 
  ];

  selectedFilter:  Set<any> = new Set()

  constructor(private droneService: DroneService){
    this.droneService.addEventListener(this);
    var  tmp = []
    DroneEventMap.map.forEach((value, key) => {
      tmp.push({ name: key })
    })
    this.eventTypes.push({ category: "Types", items: tmp})
  }

  onDroneEvent(event: DroneEvent) {
    var log = {
      date: new Date(),
      type: DroneEvents[event.id],
      message: JSON.stringify(event.data)
    }
    this.events.push(log)
    if (this.shouldAdd(DroneEvents[event.id])) {
      this.filteredResults.push(log)
    }
  }

  callType(value) {
    this.selectedFilter = new Set();
    value.forEach(element => {
      this.selectedFilter.add(element)
    });
    this.refreshFilter()
  }

  markAll() {
    console.warn("Select all")
  }

  refreshFilter() {
    if (this.selectedFilter.size == 0) {
      this.filteredResults = this.events;
      return
    }

    this.filteredResults = []
    this.events.forEach(log => {
      if (this.shouldAdd(log.type)) {
        this.filteredResults.push(log)
      }
    });
  }

  shouldAdd(incomingEventType: any) {
    console.log("Check if need to add")
    return this.selectedFilter.size == 0 || this.selectedFilter.has(incomingEventType);
  }

}