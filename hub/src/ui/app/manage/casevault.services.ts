import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//
// CaseVault services
//
@Injectable()
export class CaseVaultService {

  private caseVaultUrl = '/api/casevault';

  constructor(private http: Http) { }

  // Get a list of organizations
  getList(): Promise<any[]> {
    return this.http.get(this.caseVaultUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // Get a list of organizations
  getById(id): Promise<any> {

    let url = `${this.caseVaultUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new casevault to the casevault
  add(casevault: any): Promise<any> {
    return this.http.post(this.caseVaultUrl, casevault)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new tenant to the casevault
  update(casevault: any): Promise<any> {
    let url = `${this.caseVaultUrl}/${casevault.id}`;
    
    return this.http.post(url, casevault)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a tenant
  delete(casevaultId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.caseVaultUrl}/${casevaultId}`;
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