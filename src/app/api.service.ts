import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResponseModel} from './model/LoginResponseModel'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // loggedIn: boolean = false
  loggedIn: boolean = true

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginResponseModel>{
    return this.http.post<LoginResponseModel>('https://reqres.in/api/login', {
      email: email,
      password: password
    });
  }
}