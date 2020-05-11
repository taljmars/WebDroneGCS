import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponseModel} from '../model/LoginResponseModel'
import {LogoutResponseModel} from '../model/LogoutResponseModel'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // loggedIn: boolean = false
  // loggedIn: boolean = true

  constructor(private http: HttpClient) {

  }

  addr = "http://localhost:8080/"

  login(email: string, password: string): Observable<LoginResponseModel>{
    // return this.http.post<LoginResponseModel>('https://reqres.in1/api/login', {
    return this.http.post<LoginResponseModel>(this.addr + 'login', {
      email: email,
      password: password
    });
  }

  logout(token: any): Observable<LogoutResponseModel>{
    // return this.http.post<LogoutResponseModel>('https://reqres.in1/api/logout', {});
    return this.http.post<LogoutResponseModel>(this.addr + 'logout', {
      token: token
    });
  }
}