import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService implements CanActivate {
  // This class is responsible for authentication and token management

  private appAuthUrl = '/api/auth';

  constructor(
    private http: Http,
    private router: Router,
    private jwtHelper: JwtHelper,
    private cookieService: CookieService) { }

  // Determine if we should activate the route
  canActivate() {

    // read token from the cookie
    
    let token = this.cookieService.get('session_id');

    if (token == null) {
      this.router.navigate(['/login']);
      return false;
    }

    token = this.jwtHelper.decodeToken(token);
    // Perform some additional checks on the token
    //this.jwtHelper.getTokenExpirationDate(token);

    return true;
  }

  public getUserName(): string {
    let tokenstring = this.cookieService.get('session_id');

    if (tokenstring == null) {
      return "";
    }

    let token = this.jwtHelper.decodeToken(tokenstring);

    return token.userid;
  }

  public isAuthenticated() {
    return true;
  }
}