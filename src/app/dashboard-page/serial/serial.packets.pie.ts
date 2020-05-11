import { Component } from '@angular/core';
import { DroneService } from 'src/app/services/drone/drone.service';
import { ProxyService } from 'src/app/services/config/proxy.service';

@Component({
  selector: 'serial-packets-pie',
  templateUrl: './serial.packets.pie.html',
//   styleUrls: ['./line-chart.component.scss'],
  styleUrls: ['./serial.component.css']
})
export class SerialPacketsPieView {

  public chartType: string = 'pie';

  private interval: number = 5; //Seconds
  private pkts: Array<Number> = [0, 0, 0];

  public chartDatasets: Array<any> = [
    { data: this.pkts, label: 'Packets Direction' },
  ];

  public chartLabels: Array<any> = ['Receive', 'Transmit', 'Lost'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(105, 0, 132, .2)', 'rgba(0, 137, 132, .2)', 'rgba(247, 70, 74, .2)'],
      borderColor: ['rgba(200, 99, 132, .7)', 'rgba(0, 10, 130, .7)', 'rgba(247, 70, 74, .7)'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(public proxyService: ProxyService, public droneService: DroneService)
  {
      console.log("Setting charts values")

      console.log("Start Monitor")
      setInterval(() => {
          // console.log("Go")
          if (this.proxyService.isProxyConnected()) {
              this.droneService.getStatistics(data => {
                  var r = data['connection']['receivedPackets']
                  var t = data['connection']['transmittedPackets']
                  var l = data['connection']['lostPackets']
                  this.updateStats(r, t, l);
              })
          }
          else {
              this.updateStats(0, 0, 0);
          }
      }, 
          this.interval * 1000
      )
  }

  updateStats(rec: Number, tran: Number, lst: Number) {
      this.chartDatasets = [
          {data: [rec, tran, lst]},
      ];
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
