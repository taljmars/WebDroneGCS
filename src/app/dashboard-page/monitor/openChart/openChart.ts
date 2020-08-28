import { Component, OnInit , ViewChild, HostListener, ElementRef} from '@angular/core';
import { DroneService, DroneEventListener } from '../../../services/drone/drone.service';
import { DroneEvent, DroneEvents, DroneEventMap } from '../../../services/drone/protocol/events.component';
import { every } from 'rxjs/operators';
import { BaseChartDirective } from 'angular-bootstrap-md';

class ChartData {

  constructor(public data: string[], public label: string, public fill: boolean) {
  }

}

const TIME_STAMP_KEY: string = 'time-stamp'
const MAX_SAMPLES: number = 60
const FRIENDLY_KEYS = {
  'time-stamp': "Time",
  "rc-in-2": "Thrust",
  "rc-out-0": "Engine 1",
  "rc-out-1": "Engine 2",
  "rc-out-2": "Engine 3",
  "rc-out-3": "Engine 4",
}

@Component({
   selector: 'open-chart',
   templateUrl: './openChart.html',
   styleUrls: ['./openChart.css']
})
export class OpenChartView implements DroneEventListener {
  
  eventTypes = new Set<string>();
  selectedItemsX: string = ""
  selectedItemsY = new Set<string>();

  timestamp = []
  /*
  data = {
    1: {
      rc-in-1: 23,
      rc-out-1: 44,
      servo-1: 11,
    },
    2: {
      rc-in-1: 673,
      rc-out-1: 419,
      servo-1: 82,
    },
    3 : {
      rc-in-1: 24,
      rc-out-1: 54,
      servo-1: 55,
    }
  }
   */
  data: Map<number, Map<string, number>> = new Map<number, Map<string, number>>()

  public chartType: string = 'line';

  public chartDatasets: Array<ChartData> = [
    { data: [], label: '-', fill: false },
    { data: [], label: '-', fill: false },
    { data: [], label: '-', fill: false },
    { data: [], label: '-', fill: false },
    // { data: [], label: 'Line 5', fill: false },
    // { data: [], label: 'Line 6', fill: false },
    // { data: [], label: 'Line 7', fill: false },    
    // { data: [], label: 'Line 8', fill: false },    
  ];

  public chartLabels: Array<any> = [];
  
  // public chartColors: 
    // {
      backgroundColor: Array<any> = [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
      ]
      borderColor: Array<any> = [
        'rgba(54, 162, 235, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
      ]
      borderWidth: number = 2
    // }
  // ;

  public chartOptions: any = {
    responsive: true,
    animation: {
      enabled: false,
      duration: 0
    },
    fill: false,
    // scales: {
    //   yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:2500}}]
    // }
  };

  constructor(private droneService: DroneService) {
    this.droneService.addEventListener(this);
    this.eventTypes.add(FRIENDLY_KEYS[TIME_STAMP_KEY])
    setInterval(cb => {
      if (this.selectedItemsY.size == 0) {
        return
      }

        let chartDatasetsTmp: Array<ChartData> = []
        let i = 0;
        
        // Setting Y axis
        this.selectedItemsY.forEach(item => {  
          let itemDataArray: string[] = []

          this.timestamp.forEach(time => {
            let timeData = this.data[time]
            if (timeData[item] != null) {
              itemDataArray.push(timeData[item])
            }
            else {
              itemDataArray.push('')
            }
          })
          chartDatasetsTmp.push(new ChartData(itemDataArray, item, false))
          i++
        })

        // Setting X axis
        this.chartLabels = []
        this.timestamp.forEach(time => {
          let timeData = this.data[time]
          if (timeData[this.selectedItemsX] != null) {
            this.chartLabels.push(timeData[this.selectedItemsX])
          }
          else {
            this.chartLabels.push('')
          }
        })

        i = 0
        for (let item of chartDatasetsTmp) {
          this.chartDatasets[i].data.length = 0
          this.chartDatasets[i].data.push(...item.data)
          this.chartDatasets[i].label = item.label
          i++
        }
        // this.chart.chart.update()
    },
    1000)
  }


  @ViewChild(BaseChartDirective , {static: false})
  public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  onDroneEvent(event: DroneEvent) {
    let that = this
    switch (event.id) {
      case DroneEvents.RC_IN:
        for (let idx in [...Array(Object.keys(event.data).length).keys()]) {
          let key = 'rc-in-' + idx
          that.addEvent(key, event.data[key], event.timestamp)
        }
        break;

      case DroneEvents.RC_OUT:
        for (let idx in [...Array(Object.keys(event.data).length).keys()]) {
          let key = 'rc-out-' + idx
          that.addEvent(key, event.data[key], event.timestamp)
        }
        break;
    }

    //Refresh samples
    while (that.timestamp.length >= MAX_SAMPLES) {
      let ts = that.timestamp.shift()
      that.data.delete(ts)
    }
  }

  setAxisX(axisName) {
    this.selectedItemsX = axisName
    this.flushCharts();
  }

  setAxisY(axisNamesSet) {
    let tmp = new Set<string>()
    axisNamesSet.forEach(element => {
      tmp.add(element)
    });
    this.selectedItemsY = tmp
  }

  flushCharts() {
    this.chartLabels = []
    for (let item of this.chartDatasets) {
      item.data.length = 0
      item.label = ""
    }
    // this.chart.chart.update()
  }

  addEvent(key: string, value: number, timestamp: number) {
    if (FRIENDLY_KEYS[key] != null)
      key = FRIENDLY_KEYS[key]

    this.eventTypes.add(key)
    if (this.selectedItemsX != key && !this.selectedItemsY.has(key))
      return

    if (this.data[timestamp] == null)
      this.data[timestamp] = new Map<string, number>()

    // Adding data
    this.data[timestamp][key] = value
    this.timestamp.push(timestamp)

    //Make time stamp as measured data as well
    this.data[timestamp][FRIENDLY_KEYS[TIME_STAMP_KEY]] = new Date(timestamp*1000).toLocaleTimeString()
  }
}