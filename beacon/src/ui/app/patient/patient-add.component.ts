import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PatientService } from './patient.services';

// TODO: Consider merging create with edit and handling the 'new' id
@Component({
  templateUrl: '/app/patient/patient-edit.component.html',
    providers:[PatientService]
})

export class PatientAddComponent {
  
  reference = "";
  showGenePanel = false;

  constructor(private dataService:PatientService, private router: Router) {
    
  }

  // Create a new patient
  save() {

    // add validation
    if (this.reference == "")
      return;

    this.dataService.addPatient({"reference":this.reference})
      .then(result => this.router.navigate(['/patient', result.id]))
      .catch(error => console.log(error))
    
    // Call the service to create a new patient

    // Redirect to the edit view
  }
}