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

  // Get a list of organizations
  getList(): Promise<any[]> {
    return this.http.get(this.beaconUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // Get a list of organizations
  getById(id): Promise<any[]> {

    let url = `${this.beaconUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new beacon to the beacon
  add(beacon: any): Promise<any> {
    return this.http.post(this.beaconUrl, beacon)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new tenant to the beacon
  update(beacon: any): Promise<any> {
    let url = `${this.beaconUrl}/${beacon.id}`;

    return this.http.post(url, beacon)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a tenant
  delete(beaconId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.beaconUrl}/${beaconId}`;
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