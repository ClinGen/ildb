import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/app/app.component.html'
})

// Set default query
export class AppComponent {
  title = 'Beacon Search Hub';

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
