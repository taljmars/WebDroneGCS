import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { ProxyService } from 'src/app/services/config/proxy.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'gcs-config',
  templateUrl: './gcs.config.component.html',
  styleUrls: ['./gcs.config.component.css']
})
export class GcsConfig {

  @ViewChild("proxyAddress", {static: false})
  public proxyAddress: any = '';

  @ViewChild("proxyPort", {static: false})
  public proxyPort: any = 0;

  events: string[] = [];

  constructor(public proxyService: ProxyService, public configService: ConfigService, public alertService: AlertsService){
    this.proxyAddress = configService.getAddress()
    this.proxyPort = configService.getPort()
  }

  onUpdate() {
    if (this.proxyService.isProxyConnected()) {
      this.alertService.openSnackBar("Proxy Connected, Please disconnect first")
      return
    }
    this.configService.setAddress(this.proxyAddress.nativeElement.value)
    this.configService.setPort(this.proxyPort.nativeElement.value)
  }
}
