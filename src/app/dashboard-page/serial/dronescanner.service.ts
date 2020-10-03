import { Injectable } from '@angular/core';
import { DroneService } from 'src/app/services/drone/drone.service';
import { ProxyService } from 'src/app/services/config/proxy.service';

@Injectable({
  providedIn: 'root'
})
export class DroneScannerService {
  
    private port: String = "com17"

    private baud: Number = 57600;
    private active: boolean = false;


    constructor(public proxyService: ProxyService, public droneService: DroneService) {
        setInterval(() => {
            if (!this.active)
                return

            if (!this.proxyService.isProxyConnected()) {
                console.warn("Reviving connection")
                this.proxyService.connect(this.port, this.baud)
                this.droneService.refreshParameters()
            }
        }
        ,
            3000
        )
    }
  
    setPort(port: String) {
        this.port = port;
    }

    getPort() {
        return this.port;
    }

    setBaud(baud: Number) {
        this.baud = baud;
    }

    getBaud() {
        return this.baud;
    }

    setActive(active: boolean) {
        this.active = active
    }

    isActive() {
        return this.active;
    }

}