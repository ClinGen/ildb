import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QueryService {
  
  constructor(private http: Http) { }

  queryBeacons(chrom:string, position:number, allele:string) {
    return this.http.get("/api/query/1/" + chrom + "/" + position + "/" + allele)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}