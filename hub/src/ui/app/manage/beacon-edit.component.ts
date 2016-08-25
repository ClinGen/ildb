import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BeaconService } from './beacon.services';

// TODO: consider reorganizing this. Can an organization have multiple beacons?
//    Place beacons as a collection under organization?
class Organization {
  name = "";
  description = "";
  address = "";
  city = "";
  state = "";
  zip = "";
  contact = new Contact();
}

class Contact {
  name = "";
  email = "";
  phone = "";
}

class Beacon {
  id = "";
  name = "";
  description = "";
  endpoint = "";
}

@Component({
  templateUrl: '/app/manage/beacon-edit.component.html',
  providers: [BeaconService]
})
export class BeaconEditComponent implements OnInit {

  isNew = false;
  id = "";

  //Beacon details
  beacon = new Beacon();
  organization = new Organization();

  constructor(private route: ActivatedRoute, private dataService: BeaconService, private router: Router) {
    this.id = route.snapshot.params["id"];
    if (this.id === "new")
      this.isNew = true;
  }

  ngOnInit() {

    // If this is a new beacon nothing to initialize
    if (this.isNew)
      return;

    // Load existing beacon information
    this.loadBeaconData();
  }

  // Load Beacon Details
  loadBeaconData() {
    this.dataService.getById(this.id)
      .then(data => {
        this.beacon.name = data.name;
        this.beacon.description = data.description;
        this.beacon.endpoint = data.endpoint;
      })
      .catch(error => console.log(error))
  }

  // Create a new beacon registration
  save() {

    // add validation
    if (this.beacon.name == "" || this.beacon.endpoint == "")
      return;

    if (this.isNew) {
      //New beacon
      this.dataService.add(this.beacon)
        .then(result => this.router.navigate(['/manage/beacons']))
        .catch(error => console.log(error))
    } else {
      let beacon = this.beacon;
      beacon.id = this.id;
      this.dataService.update(beacon)
        .then(result => this.router.navigate(['/manage/beacons']))
        .catch(error => console.log(error))
      //Update existing beacon
    }
  }
}
