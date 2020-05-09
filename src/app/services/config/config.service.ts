import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  
  addr = "http://localhost:8080/"

  get(url : string, options: any, data: any, okCallback: Function, errCallback?: Function) {
    if (errCallback)
      this.http.get(this.addr + url, options).subscribe(data=>okCallback(data), err=>errCallback(err));
    else
      this.http.get(this.addr + url, options).subscribe(data=>okCallback(data));
  }

  post(url : string, options: any, data: any, okCallback: Function, errCallback?: Function) {
    console.log("Posting")
    console.log(data)
    if (errCallback)
      this.http.post(this.addr + url, data, options).subscribe(data => okCallback(data), err=>errCallback(err));
    else
      this.http.post(this.addr + url, data, options).subscribe(data => okCallback(data));
  }
}