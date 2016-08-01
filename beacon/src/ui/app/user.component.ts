import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'user-info',
  template: `
    <div>{{username}}</div><a (click)="logout()">Logout</a>
    `,
  providers: [CookieService]
})

export class UserComponent implements OnInit {

  constructor(private cookieService:CookieService){}

  title = 'Login';
  username = '';
  isAuth = false;

  ngOnInit() {
    let session = this.cookieService.get('session_id');
    if (session) {
      this.username = 'test@fs180.onmicrosoft.com';
    }
  }

  logout() {
    this.cookieService.remove('session_id');
    window.location.href = '/';
  }
}
