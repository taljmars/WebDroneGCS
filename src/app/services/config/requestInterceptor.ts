import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
 
  constructor() {}
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        tap(
            event => {},
            err => {
                if (err instanceof HttpErrorResponse) {
                    // console.warn("Win " + err)
                }
            }
        )
    );
  }
}