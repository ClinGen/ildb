import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BeaconService } from './beacon.services';

// TODO: Consider merging create with edit and handling the 'new' id
// Name, logo, beacon endpoint, contact name/email.
@Component({
  templateUrl: '/app/manage/beacon-edit.component.html',
  providers:[BeaconService]
})

export class BeaconEditComponent implements OnInit {

  isNew = false;
  id = "";

  name = "";
  endpoint = "";

  constructor(private route: ActivatedRoute, private dataService:BeaconService, private router: Router) {
    let id = route.snapshot.params["id"];
    if (id === "new")
      this.isNew = true;
  }

  ngOnInit() {
    if (this.isNew)
      return;

    // Load existing beacon information
    
  }

  // Create a new beacon registration
  save() {

    // add validation
    if (this.name == "" || this.endpoint == "")
      return;

    if (this.isNew) {
      //New beacon
      this.dataService.add({"name":this.name, "endpoint":this.endpoint})
        .then(result => this.router.navigate(['/manage/beacons']))
        .catch(error => console.log(error))
    } else {
      //Update existing beacon
    }
  }
}
