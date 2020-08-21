import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { ProxyService } from '../../../services/config/proxy.service';


@Component({
  selector: 'server-config',
  templateUrl: './server.config.component.html',
  styleUrls: ['./server.config.component.css']
})
export class ServerConfig {

  events: string[] = [];
  active: boolean = false

  constructor(public configService: ConfigService, public proxyService: ProxyService){
  }

  activateServer() {
    this.active = true
    this.configService.setAddress("localhost");
  }

}
