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
    return AppConstants.MyStorage.get(TOKEN) != null;
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

}