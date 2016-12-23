import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//
// Cae services
//
@Injectable()
export class CaseService {

  private caseUrl = '/api/case';

  constructor(private http: Http) { }

  // Upload a vcf file
  uploadCaseSample(id, file) {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      // update file upload progress
      xhr.upload.onprogress = (event:any) => {
        let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        console.log(progress);
      };

      xhr.open('POST', `${this.caseUrl}/${id}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, 'vcfimport');

      xhr.send(formData);
    });
  }

  // Get a list of cases
  getCaseList(): Promise<any[]> {
    return this.http.get(this.caseUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getById(id:string): Promise<any> {
    let url = `${this.caseUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new case to the beacon
  addCase(caseDoc: any): Promise<any> {
    return this.http.post(this.caseUrl, caseDoc)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateCase(id: string, caseDoc: any): Promise<any> {
    let url = `${this.caseUrl}/${id}`;
    return this.http.post(url, caseDoc)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a case
  deleteCase(caseId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.caseUrl}/${caseId}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  // get a list of genome samples for a case
  getCaseSamples(caseId: string): Promise<any> {
    return this.http.get(`${this.caseUrl}/${caseId}/sample`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete case samples
  deleteCaseSample() {

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