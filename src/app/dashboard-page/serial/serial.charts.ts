import { Component } from '@angular/core';
import { DroneService } from 'src/app/services/drone/drone.service';
import { ProxyService } from 'src/app/services/config/proxy.service';

@Component({
  selector: 'serial-chart',
  templateUrl: './serial.charts.html',
//   styleUrls: ['./line-chart.component.scss'],
  styleUrls: ['./serial.component.css']
})
export class SerialChartsView {

  public chartType: string = 'line';

  private r_pps: Array<Number> = [65, 59, 80, 81, 56, 55, 40];
  private t_pps: Array<Number> = [28, 48, 40, 19, 86, 27, 90];
  private time: Array<Number> = [-6, -5, -4, -3, -2, -1, 0];

  private interval: number = 5; //Seconds
  private duration: number = 120; //Seconds

  public chartDatasets: Array<any> = [
    { data: this.r_pps, label: 'Received PPS' },
    { data: this.t_pps, label: 'Transmitted PPS' }
  ];

  public chartLabels: Array<any> = this.time;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

    constructor(public proxyService: ProxyService, public droneService: DroneService)
    {
        console.log("Setting charts values")
        this.time = []
        this.r_pps = []
        this.t_pps = []
        for (let i = 0 ; i <= this.duration ; i+=this.interval) {
            this.time.push(-1 * (this.duration - i))
            this.r_pps.push(0);
            this.t_pps.push(0);
        }
        this.chartLabels = this.time;

        console.log("Start Monitor")
        setInterval(() => {
            // console.log("Go")
            if (this.proxyService.isProxyConnected()) {
                this.droneService.getStatistics(data => {
                    var r = data['connection']['receivedPacketsPerSecond']
                    var t = data['connection']['transmittedPacketsPerSecond']
                    this.updateStats(r, t);
                })
            }
            else {
                this.updateStats(0, 0);
            }
        }, 
            this.interval * 1000
        )
    }

    updateStats(rec: Number, tran: Number) {
        this.t_pps.push(tran)
        this.t_pps.shift();

        this.r_pps.push(rec)
        this.r_pps.shift();

        this.chartDatasets = [
            {data: this.r_pps},
            {data: this.t_pps},
        ];
    }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
