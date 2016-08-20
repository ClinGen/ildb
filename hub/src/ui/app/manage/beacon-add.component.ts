import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TenantService } from './beacon.services';

// TODO: Consider merging create with edit and handling the 'new' id
// Name, logo, beacon endpoint, contact name/email.
@Component({
  template: `
    <h2>Add Tenant</h2>
    <div>
      Additional data TBD
    </div>
    <div>
      name
      <input type="text" [(ngModel)]="name" />
    </div>
    <div>
      endponit
      <input type="text" [(ngModel)]="endpoint" />
    </div>
    <div>
      <button (click)="add()">add</button>
    </div>
    `,
    providers:[TenantService]
})

export class TenantAddComponent {
  
  name = "";
  endpoint = "";

  constructor(private dataService:TenantService, private router: Router) {
    
  }

  // Create a new beacon registration
  add() {

    // add validation
    if (this.name == "" || this.endpoint == "")
      return;

    this.dataService.addTenant({"name":this.name, "endpoint":this.endpoint})
      .then(result => this.router.navigate(['/tenants', result.id]))
      .catch(error => console.log(error))
    
    // Call the service to create a new patient

    // Redirect to the edit view

  }
}