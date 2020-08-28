import { Component, OnInit , ViewChild, HostListener, ElementRef} from '@angular/core';
import { DroneService, DroneEventListener } from '../../../services/drone/drone.service';
import { DroneEvent, DroneEvents } from '../../../services/drone/protocol/events.component';

@Component({
   selector: 'servo-output',
   templateUrl: './servo.component.html',
   styleUrls: ['./servo.component.css']
})
export class ServoView implements DroneEventListener {
  public chartType: string = 'bar';

  public chartDatasets_in: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Radio In' }
  ];

  public chartDatasets_out: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Servo PWM' }
  ];

  public chartLabels_in: Array<any> = ['-', '-', '-', '-', '-', '-', '-', '-',];
  public chartLabels_out: Array<any> = ['-', '-', '-', '-', '-', '-', '-', '-',];

  public chartColors_in: Array<any> = [
    {
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 206, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        // 'rgba(255,99,132,1)',
        // 'rgba(255, 206, 86, 1)',
        // 'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public chartColors_out: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 99, 132, 0.2)',
        // 'rgba(255, 206, 86, 0.2)',
        // 'rgba(75, 192, 192, 0.2)',
        // 'rgba(153, 102, 255, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
        // 'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        // 'rgba(255,99,132,1)',
        // 'rgba(255, 206, 86, 1)',
        // 'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    animation: {
      enabled: false,
      duration: 0
    },
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:2500}}]
    }
  };

  constructor(private droneService: DroneService) {
    this.droneService.addEventListener(this);
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  onDroneEvent(event: DroneEvent) {
    switch (event.id) {
      
      case DroneEvents.RC_IN:
        let labelArray_in = new Array<String>()
        let valueArray_in = []
        for (let idx in [...Array(Object.keys(event.data).length).keys()]) {
          labelArray_in.push("Ch-" + idx)
          let val = event.data['rc-in-' + idx]
          valueArray_in.push(val > 5000 ? 0 : val)
        }
        this.chartLabels_in = labelArray_in;
        this.chartDatasets_in = [{ data: valueArray_in, label: 'Radio In' }]; 
        break;

      case DroneEvents.RC_OUT:
        let labelArray_out = new Array<String>()
        let valueArray_out = []
        for (let idx in [...Array(Object.keys(event.data).length).keys()]) {
          labelArray_out.push("Servo-" + idx)
          let val = event.data['rc-out-' + idx]
          valueArray_out.push(val > 5000 ? 0 : val)
        }
        this.chartLabels_out = labelArray_out;
        this.chartDatasets_out = [{ data: valueArray_out, label: 'Servo PWM' }]; 
        break;

    }
  }
}