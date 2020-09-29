import {Injectable} from '@angular/core';
import { AppConstants } from '../../local.storage'

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly ADDRESS = "address"
  private static readonly PORT = "port"
  private static readonly USERNAME = "username"
  private static readonly MODE = "mode"
  private static readonly SCAN_MASK = "scan_mask"
  private static readonly SCAN_SUBNET = "scan_subnet"
  private static readonly SCAN_PORT = "scan_port"

  getToken(): String {
    return AppConstants.MyStorage.get(TOKEN)
  }

  setToken(token: string, username: string): void {
    AppConstants.MyStorage.set(TOKEN, token);
    AppConstants.MyStorage.set(UserService.USERNAME, username);
  }

  removeToken() {
    AppConstants.MyStorage.remove(TOKEN);
    AppConstants.MyStorage.remove(UserService.USERNAME);
  }

  getUserName() {
    return AppConstants.MyStorage.get(UserService.USERNAME);
  }

  isLogged() {
    return AppConstants.MyStorage.get(TOKEN) != null && this.getUserName() != null;
  }

  setProxyAddress(address: string) {
    AppConstants.MyStorage.set(this.getUserName() + UserService.ADDRESS, address)
  }

  getProxyAddress() {
      return AppConstants.MyStorage.get(this.getUserName() + UserService.ADDRESS)
  }

  setProxyPort(port: string) {
      AppConstants.MyStorage.set(this.getUserName() + UserService.PORT, port)
  }

  getProxyPort() {
      return AppConstants.MyStorage.get(this.getUserName() + UserService.PORT)
  }

  getMode() {
    return AppConstants.MyStorage.get(this.getUserName() + UserService.MODE)
  }

  setMode(mode: string) {
    AppConstants.MyStorage.set(this.getUserName() + UserService.MODE, mode)
  }

  getScanMask(): number {
    return +AppConstants.MyStorage.get(this.getUserName() + UserService.SCAN_MASK)
  }

  setScanMask(mask: number) {
    AppConstants.MyStorage.set(this.getUserName() + UserService.SCAN_MASK, "" + mask)
  }

  getScanSubnet(): string {
    return AppConstants.MyStorage.get(this.getUserName() + UserService.SCAN_SUBNET)
  }

  setScanSubnet(sub: string) {
    AppConstants.MyStorage.set(this.getUserName() + UserService.SCAN_SUBNET, sub)
  }

  getScanPort(): number {
    return +AppConstants.MyStorage.get(this.getUserName() + UserService.SCAN_PORT)
  }

  setScanPort(port: number) {
    +AppConstants.MyStorage.set(this.getUserName() + UserService.SCAN_PORT, "" +port)
  }
}