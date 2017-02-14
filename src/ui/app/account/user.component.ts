import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'user-info',
  template: `
    <div>{{username()}}</div><a href="#" (click)="logout()" [hidden]="username()==''">Logout</a>
    `,
  providers: [CookieService]
})

export class UserComponent {

  constructor(private cookieService:CookieService, private authService:AuthService){}

  title = 'Login';
  isAuth = false;

  username() {
    return this.authService.getUserName();
  }
  
  logout() {
    this.cookieService.remove('session_id');
    window.location.href = '/';
  }
}
