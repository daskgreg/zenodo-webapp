import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  adminUser:any;
  auth_token:any;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.adminUser = localStorage.getItem('currentUser')
    this.adminUser = JSON.parse(this.adminUser);
    this.auth_token = this.adminUser.token;

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.auth_token
      }
    })
    return next.handle(tokenizedRequest);
  }

  constructor() {
       
   }
}
