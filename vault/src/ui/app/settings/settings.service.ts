import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//
// Case services
//
@Injectable()
export class SettingsService {

  private vcfUrl = '/api/settings';

  constructor(private http: Http) { }

  // Get a list of vcf files
  getDetails(): Promise<any> {
    return this.http.get(this.vcfUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // error handling
  private handleError(error: any) {
    // move this to the user auth component
    if (error.status == 401) {
      window.location.href = "/#/login";
    }

    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}