import {Injectable} from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getToken(): String {
    return localStorage.getItem(TOKEN)
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN)
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}