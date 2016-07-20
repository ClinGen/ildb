import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  // This class is responsible for authentication as well as token management and injection
  
  private appAuthUrl = '/api/auth';

  constructor(private http: Http) { }
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}