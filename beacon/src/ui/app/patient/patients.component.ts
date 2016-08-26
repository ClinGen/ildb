import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from './patient.services';

@Component({
  templateUrl:'/app/patient/patient.component.html',
    providers:[PatientService]
})

export class PatientsComponent implements OnInit {
  
  patients = [];

  constructor (
    private router: Router,
    private dataService: PatientService) {
  }

  ngOnInit() {
    this.getPatients();
  }
  
  getPatients() {
    this.dataService.getPatientList()
      .then(patients => this.patients = patients)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.deletePatient(id)
      .then(data => this.getPatients())
      .catch(error => console.log(error))
  }
}
