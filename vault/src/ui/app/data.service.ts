import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  //TODO: break this out in to multiple

  private samplesUrl = '/api/manage/samples';
  private caseUrl = '/api/case';

  constructor(private http: Http) { }

  //return all samples
  getSamples(): Promise<any[]> {
    return this.http.get(this.samplesUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a sample from the data store
  delete(sampleId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.samplesUrl}/${sampleId}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

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

      xhr.open('POST', `${this.caseUrl}/${id}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, 'vcfimport');

      xhr.send(formData);
    });
  }

  getCaseList(): Promise<any[]> {
    return this.http.get(this.caseUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  addCase(caseDoc: any): Promise<any> {
    return this.http.post(this.caseUrl, caseDoc)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteCase(caseId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.caseUrl}/${caseId}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  getCaseSamples(caseId: string): Promise<any> {

    return this.http.get(`${this.caseUrl}/${caseId}/sample`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // move this to the user auth component
    if (error.status == 401) {
      window.location.href = "/#/login";
    }

    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}