import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//
// Patient services
//
@Injectable()
export class PatientService {

  private patientUrl = '/api/patient';

  constructor(private http: Http) { }

  // Upload a vcf file
  uploadPatientSample(id, file) {
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

      xhr.open('POST', `${this.patientUrl}/${id}/sample`, true);

      let formData = new FormData();

      formData.append("file", file, 'vcfimport');

      xhr.send(formData);
    });
  }

  // Get a list of patients
  getPatientList(): Promise<any[]> {
    return this.http.get(this.patientUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getById(id:string): Promise<any> {
    let url = `${this.patientUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // add a new patient to the beacon
  addPatient(patient: any): Promise<any> {
    return this.http.post(this.patientUrl, patient)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete a patient
  deletePatient(patientId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.patientUrl}/${patientId}`;
    return this.http
      .delete(url, headers)
      .toPromise()
      .catch(this.handleError);
  }

  // get a list of genome samples for a patient
  getPatientSamples(patientId: string): Promise<any> {
    return this.http.get(`${this.patientUrl}/${patientId}/sample`)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // delete patient samples
  deletePatientSample() {

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