import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject:  BehaviorSubject<User | any>;
    public currentUser!: Observable<User>;
    value:any ;

    constructor(private http: HttpClient,private router: Router) {
        this.value = localStorage.getItem('currentUser');
        this.value = JSON.parse(this.value);
        this.currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
        console.log(this.value,this.currentUserSubject)
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:3000/api/v1/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        let use = localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}