import { Component, OnInit , ViewChild, ElementRef, Input} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/users/user.service';
import { DroneService } from 'src/app/services/drone/drone.service';


export abstract class GcsConfig {

  @Input() public proxyAddress: any = '';
  @Input() public proxyPort: any = 0;


  @Input() public proxyScanSubnet: any = '192.168.14.0';
  @Input() public proxyScanMask: any = 24;

  @Input() public modeStatus: any = 0;
  @Input() public alt: any = 0;
  @Input() public sensors: any = 0;
  @Input() public pos: any = 0;
  @Input() public rc: any = 0;
  @Input() public controller: any = 0;
  
  proxyDef = 'manual'

  droneServers: string[] = []

  events: string[] = [];

  constructor(public droneService: DroneService, public proxyService: ProxyService, public configService: ConfigService, public alertService: AlertsService, public userService: UserService){
    this.proxyAddress = configService.getAddress()
    this.proxyPort = configService.getPort()
    this.droneService.getStreamRate(
      data => {
        this.modeStatus = data.modeStatus;
        this.alt = data.alt;
        this.pos = data.pos;
        this.rc = data.rc;
        this.sensors = data.sensors;
        this.controller = data.controller;
      },
      data => {
        console.error("Failed to get stream rates")
      }
    )
  }

  onUpdate() {
    if (this.proxyService.isProxyConnected()) {
      this.alertService.promptError("Proxy Connected, Please disconnect first")
      return
    }
    // this.configService.setAddress(this.proxyAddress.nativeElement.value)
    // this.configService.setPort(this.proxyPort.nativeElement.value)
    this.configService.setAddress(this.proxyAddress)
    this.configService.setPort(this.proxyPort)
    
    // this.userService.setProxyAddress(this.proxyAddress.nativeElement.value)
    // this.userService.setProxyPort(this.proxyPort.nativeElement.value)
    this.userService.setProxyAddress(this.proxyAddress)
    this.userService.setProxyPort(this.proxyPort)
  }

  updateStreamRates() {
    this.droneService.setStreamRate(
      this.alt,
      this.pos,
      this.modeStatus,
      this.rc,
      this.sensors,
      this.controller,
      data => this.alertService.promptSuccess("Stream rates were succussfully updated"), 
      data => this.alertService.promptError("Failed to update stream rates")
    )
    console.error("Update Stream Rates")
  }

  win(data) {
    console.log("Win")
    console.log(data["addresses"])
    this.droneServers.push(data["addresses"])
  }

  fail(data) {
    // console.log("Fail")
    // console.log(data)
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
        this.fail
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
