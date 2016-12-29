import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryService {
  
  constructor(private http: Http) { }

  queryBeacons(chrom:string, position:number, allele:string, clinical_indications:string, populations:string) {
    let url:string = "/api/query/1/" + chrom + "/" + position + "/" + allele + "?";

    if (!!clinical_indications && 0 !== clinical_indications.length) {
      url += "clinic_indications=" + clinical_indications + "&"
    }

    if (!!populations && 0 !== populations.length) {
      url += "populations=" + populations + "&"
    }

    return this.http.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}