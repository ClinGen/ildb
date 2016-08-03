import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  template: `
    <h2>Add Patient</h2>
    <div>
      Additional data TBD
    </div>
    <div>
      reference
      <input type="text" [(ngModel)]="reference">
    </div>
    <div>
      <button (click)="add()">add</button>
    </div>
    `,
    providers:[DataService]
})

export class PatientAddComponent {
  
  reference = "";

  constructor(private dataService:DataService, private router: Router) {
    
  }

  // Create a new patient
  add() {

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