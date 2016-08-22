import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//
// Beacon services
//
@Injectable()
export class BeaconService {

  private beaconUrl = '/api/beacons';

  constructor(private http: Http) { }

  // Get a list of tenants
  getList(): Promise<any[]> {
    return this.http.get(this.beaconUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new tenant to the beacon
  add(tenant: any): Promise<any> {
    return this.http.post(this.beaconUrl, tenant)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new tenant to the beacon
  update(tenant: any): Promise<any> {
    return this.http.post(this.beaconUrl, tenant)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a tenant
  delete(tenantId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.beaconUrl}/${tenantId}`;
    return this.http
      .delete(url, headers)
      .toPromise()
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