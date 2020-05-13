import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private address: String = "localhost"
  // private port: Number = 8080;
  private port: Number = 8443;


  constructor(private http: HttpClient) { }
  
  // addr = "http://localhost:8080/"

  setAddress(address: String) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  setPort(port: Number) {
    this.port = port;
  }

  getPort() {
    return this.port;
  }


  getUrl() {
    return "https://" + this.address + ":" + this.port + "/"
  }

  get(url : string, options: any, data: any, okCallback: Function, errCallback?: Function) {
    if (errCallback)
      this.http.get(this.getUrl() + url, options).subscribe(data=>okCallback(data), err=>errCallback(err));
    else
      this.http.get(this.getUrl() + url, options).subscribe(data=>okCallback(data));
  }

  post(url : string, options: any, data: any, okCallback: Function, errCallback?: Function) {
    console.log("Posting")
    console.log(data)
    if (errCallback)
      this.http.post(this.getUrl() + url, data, options).subscribe(data => okCallback(data), err=>errCallback(err));
    else
      this.http.post(this.getUrl() + url, data, options).subscribe(data => okCallback(data));
  }
}