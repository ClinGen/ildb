import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  
  private samplesUrl = '/api/manage/samples';

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
  uploadVcf() {

  }
  
  private handleError(error: any) {
    // move this to the user auth component
    if (error.status = 401) {
      window.location.href = "/#/login";
    }
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}