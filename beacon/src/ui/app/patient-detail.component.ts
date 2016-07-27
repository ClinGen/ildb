import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: `
    <h2>Patient Details</h2>
    {{patientId}}
    `
})

export class PatientDetailsComponent {
  patientId = "";
  constructor(route: ActivatedRoute) {
    this.patientId = route.snapshot.params['id'];
  }
}