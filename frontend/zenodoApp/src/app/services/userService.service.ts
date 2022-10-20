import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    adminUser:any;
    auth_token:any;
    constructor(private http: HttpClient,private router: Router){
        this.adminUser = localStorage.getItem('currentUser')
        this.adminUser = JSON.parse(this.adminUser);
        this.auth_token = this.adminUser.token;
        console.log(this.adminUser);
        console.log(this.auth_token);
    }
    userList() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.auth_token}`
          })
        const requestOptions = { headers: headers };
        return this.http.post<any>(`http://localhost:3000/api/v1/users/list`, {headers:headers})
            .pipe(map(userList => {
                // Fetch All users
                return userList;
            }));
    }
}