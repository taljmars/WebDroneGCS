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
    if (email == "") {
      console.error("Missing email")
      return
    }

    // if (password == "") {
    //   console.error("Missing password")
    //   return
    // }

    // create observable
    const simpleObservable = new Observable<LoginResponseModel>((observer) => {
        
      // observable execution
      observer.next({
        token: "aaa",
        error: "",
      })
      observer.error()
      observer.complete()
    })

    return simpleObservable;
    // return this.http.post<LoginResponseModel>(this.addr + 'login', {
    //   email: email,
    //   password: password
    // });
  }

  logout(token: any): Observable<LogoutResponseModel>{
    // create observable
    const simpleObservable = new Observable<LogoutResponseModel>((observer) => {
        
      // observable execution
      observer.next({
        error: "",
      })
      observer.error()
      observer.complete()
    })

    return simpleObservable;
    // return this.http.post<LogoutResponseModel>(this.addr + 'logout', {
    //   token: token
    // });
  }
}