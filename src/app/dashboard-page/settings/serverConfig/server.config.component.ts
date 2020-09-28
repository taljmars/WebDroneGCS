import { Component, OnInit , ViewChild, ElementRef, Input} from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { ProxyService } from '../../../services/config/proxy.service';
import { ApplicationStateService } from 'src/app/application-state.service';


@Component({
  selector: 'server-config',
  templateUrl: './server.config.component.html',
  styleUrls: ['./server.config.component.css']
})
export class ServerConfig {

  @Input() public proxyAddress: any = '';
  @Input() public proxyPort: any = 0;


  @Input() public proxyScanSubnet: any = '192.168.14.0';
  @Input() public proxyScanMask: any = 24;

  events: string[] = [];
  active: boolean = false

  proxyDef = 'manual'
  gcsMode = null

  droneServers: string[] = []

  constructor(public applicationStateService: ApplicationStateService, public configService: ConfigService, public proxyService: ProxyService){
    if (this.applicationStateService.getIsMobileResolution())
        this.gcsMode = 'remote'
  }

  activateServer() {
    this.active = true
    this.configService.setAddress("localhost");
  }

  u(n) { return n >>> 0; } // we need to treat the numbers as unsigned
  
  ip(n) {
    return [
        (n >>> 24) & 0xFF,
        (n >>> 16) & 0xFF,
        (n >>>  8) & 0xFF,
        (n >>>  0) & 0xFF
    ].join('.');
  }

  scan() {

    //  proxyScanSubnet = '198.162.1.1',
    let m = this.proxyScanSubnet.match(/\d+/g),       // [ '198', '162', '1', '1', '24' ]
    addr32 = m.slice(0, 4).reduce((a, o) => {
      return this.u(+a << 8) + +o;
    }),

    mask = this.u(~0 << (32 - + this.proxyScanMask)); // 0xffffff00
    
    
    var start = this.u(addr32 & mask), // 198.162.1.0
    end = this.u(addr32 | ~mask);  // 198.162.1.255
    
    let i = 0;
    let initValue = this.configService.getAddress();

    console.log("Start")

    while (i < 500) { //MAX SCAN RANGE
      let addr = start + i
      i = i + 1

      if (addr > end)
        continue

      console.log("Checking " + this.ip(addr))
      this.configService.setAddress(this.ip(addr))
      this.proxyService.pingProxyService(data => {
          console.log("Win")
          console.log(data["addresses"])
          for (let val of data["addresses"])
            this.droneServers.push(val)
        }, 
        data => {}
      )
    }

    // Restore
    this.configService.setAddress(initValue)
    this.proxyService.pingProxyService()
    console.log("Done")
  }

  selectScanResults(server) {
    console.log("Select " + server )
    this.configService.setAddress(server)
    this.proxyService.pingProxyService()
  }

}
