import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from './account/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html'
})
export class AppComponent {
  constructor(private cookieService: CookieService, private authService: AuthService) { }

  isAuth = false;

  username() {
    return this.authService.getUserName();
  }

  logout() {
    this.cookieService.remove('session_id');
    window.location.href = '/';
  }
}