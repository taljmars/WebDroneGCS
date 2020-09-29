import { Component, OnInit , ViewChild, ElementRef, Input} from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { ProxyService } from '../../../services/config/proxy.service';
import { ApplicationStateService } from 'src/app/application-state.service';
import { UserService } from 'src/app/services/users/user.service';


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
  @Input() public proxyScanPort: any = 8443;

  events: string[] = [];
  active: boolean = false

  proxyDef = 'manual'
  gcsMode = null

  droneServers: string[] = []

  constructor(public userService: UserService, public applicationStateService: ApplicationStateService, public configService: ConfigService, public proxyService: ProxyService){
    if (this.applicationStateService.getIsMobileResolution())
      this.gcsMode = 'remote'
    else 
      this.gcsMode = this.userService.getMode()

    this.proxyScanSubnet = this.userService.getScanSubnet()
    this.proxyScanMask = this.userService.getScanMask()
    this.proxyScanPort = this.userService.getScanPort()
    this.proxyAddress = this.userService.getProxyAddress()
    this.proxyPort = this.userService.getProxyPort()
  }

  activateServer() {
    this.active = true
    this.userService.setMode(this.gcsMode)
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

    this.userService.setScanSubnet(this.proxyScanSubnet)
    this.userService.setScanMask(this.proxyScanMask)
    this.userService.setScanPort(this.proxyScanPort)
  }

  selectScanResults(server) {
    console.log("Select " + server )
    this.configService.setAddress(server)
    this.proxyService.pingProxyService()

    // Persiste the data
    this.userService.setProxyAddress(server)
    this.userService.setProxyPort(this.proxyScanPort)
    this.userService.setMode(this.gcsMode)
  }

  onUpdate() {
    // if (this.proxyService.isProxyConnected()) {
    //   this.alertService.promptError("Proxy Connected, Please disconnect first")
    //   return
    // }
    // this.configService.setAddress(this.proxyAddress.nativeElement.value)
    // this.configService.setPort(this.proxyPort.nativeElement.value)
    this.configService.setAddress(this.proxyAddress)
    this.configService.setPort(this.proxyPort)
    
    // this.userService.setProxyAddress(this.proxyAddress.nativeElement.value)
    // this.userService.setProxyPort(this.proxyPort.nativeElement.value)
    this.userService.setProxyAddress(this.proxyAddress)
    this.userService.setProxyPort(this.proxyPort)

    this.userService.setMode(this.gcsMode)
  }

}
