import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BeaconService } from './beacon.services';

// TODO: Consider merging create with edit and handling the 'new' id
// Name, logo, beacon endpoint, contact name/email.
@Component({
  templateUrl: '/app/manage/beacon-edit.component.html',
  providers:[BeaconService]
})

export class TenantAddComponent {

  name = "";
  endpoint = "";

  constructor(private dataService:BeaconService, private router: Router) {

  }

  // Create a new beacon registration
  add() {

    // add validation
    if (this.name == "" || this.endpoint == "")
      return;

    this.dataService.add({"name":this.name, "endpoint":this.endpoint})
      .then(result => this.router.navigate(['/tenants', result.id]))
      .catch(error => console.log(error))

    // Call the service to create a new patient

    // Redirect to the edit view

  }
}
