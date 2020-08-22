import { Component, OnInit, ViewChild} from '@angular/core';

import { ProxyService } from '../../services/config/proxy.service';
import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvent, DroneEvents } from 'src/app/services/drone/protocol/events.component';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'status-map',
  templateUrl: './statusMap.html',
  styleUrls: [ './statusMap.css']
})
export class StatusMapView implements DroneEventListener, OnInit {

  static MAX_COL: number = 8
  static MAX_ROWS: number = 8
  displayedColumns = []
  dataSource = []
  // myMap: Map<string, string> = new Map()
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(public proxyService: ProxyService,
              public droneService: DroneService){

    droneService.addEventListener(this)
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    for  (let i = 0 ; i < StatusMapView.MAX_COL ; i++ ) {
      this.displayedColumns.push("name" + i)
      this.displayedColumns.push("value" + i)
    }
    setInterval(() => {
      this.refresh()
    }, 
    1000)
  }

  refresh() {
    let tmpData = []
    let i: number = 0;
    const sortedKeys: string[] = [...this.droneService.myMap.keys()].sort();
    sortedKeys.forEach((key) => {
    // this.droneService.myMap.forEach((value, key) => {
      let col = Math.floor(Math.fround(i / StatusMapView.MAX_ROWS))
      let row = i % StatusMapView.MAX_ROWS
      var cname = "name" + col
      var cvalue = "value" + col
      var tmp = {}
        tmp[cname] = key
        tmp[cvalue] = this.droneService.myMap.get(key)
      if (col > 0) {
        tmpData[row][cname] = key
        tmpData[row][cvalue] = this.droneService.myMap.get(key)
      }
      else {
        tmpData.push(tmp)
      }
      i++
    })
    this.dataSource = tmpData
  }

  onDroneEvent(event: DroneEvent) {
    // let that = this
    switch (event.id) {
      case DroneEvents.ATTITUDE:
        // break;
      case DroneEvents.BATTERY:
        // break;
      case DroneEvents.CALIBRATION_IMU:
        // break;
      case DroneEvents.FOOTPRINT:
        // break;
      case DroneEvents.FIRMWARE:
        // break;
      case DroneEvents.GPS:
        // break;
      case DroneEvents.GPS_FIX:
        // break;
      case DroneEvents.GPS_COUNT:
        // break;      
      case DroneEvents.MAGNETOMETER:
        // break;      
      case DroneEvents.ORIENTATION:
        // break;
      case DroneEvents.PROTOCOL_IDENTIFIED:
        // break;
      case DroneEvents.PROTOCOL_LEARNING:
        // break;
      case DroneEvents.RADIO:
        // break;
      case DroneEvents.RC_IN:
        // break;
      case DroneEvents.RC_OUT:
        // break;
      case DroneEvents.SPEED:
        // break;
      case DroneEvents.STATE:
        // break;
      case DroneEvents.TYPE:
        // break;

    //     Object.keys(event.data).forEach(function(key) {
    //       // console.table('Key : ' + key + ', Value : ' + event.data[key])
    //       that.myMap.set(key, event.data[key])
    //     })
    //     break;
    }
  }

}