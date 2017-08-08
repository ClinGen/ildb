import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryService {
  
  constructor(private http: Http) { }

  queryCaseVaults(queryid:string, chrom:string, position:string, allele:string, clinical_indications:string, populations:string) {
    let body = {
        chrom: chrom,
        position: position,
        allele: allele
    }

    let url:string = "/api/query/exec/" + queryid;

    if (!!clinical_indications && 0 !== clinical_indications.length) {
      body["clinic_indications"] = clinical_indications
    }

    if (!!populations && 0 !== populations.length) {
      if (populations != "any") {
        body["populations"] = populations;
      }
    }

    return this.http.post(url, body)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}