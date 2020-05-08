import { ProxyService } from './serial/config/proxy.service';

export abstract class Dash {

  constructor(public proxyService: ProxyService) {
  }

}
