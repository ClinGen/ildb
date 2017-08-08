import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: '/app/app.component.html'
})

// Set default query
export class AppComponent {
  title = 'Case Vault Search';

  constructor(private cookieService: CookieService, private authService: AuthService) { }

  isAuth = false;

  username() {
    return this.authService.getUserName();
  }
  
  logout() {
    this.cookieService.remove('session_id');
    window.location.href = '/';
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdminUser() {
    return this.authService.isAdminUser();
  }
}
