import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CaseVaultService } from './casevault.services';

// TODO: consider reorganizing this. Can an organization have multiple casevaults?
//    Place casevaults as a collection under organization?
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

class CaseVault {
  id = "";
  name = "";
  description = "";
  endpoint = "";
}

@Component({
  templateUrl: '/app/manage/casevault-edit.component.html',
  providers: [CaseVaultService]
})
export class CaseVaultEditComponent implements OnInit {

  isNew = false;
  id = "";

  //CaseVault details
  casevault = new CaseVault();
  organization = new Organization();

  constructor(private route: ActivatedRoute, private dataService: CaseVaultService, private router: Router) {
    this.id = route.snapshot.params["id"];
    if (this.id === "new")
      this.isNew = true;
  }

  ngOnInit() {

    // If this is a new casevault nothing to initialize
    if (this.isNew)
      return;

    // Load existing casevault information
    this.loadCaseVaultData();
  }

  // Load Case Vault Details
  loadCaseVaultData() {
    this.dataService.getById(this.id)
      .then(data => {
        this.casevault.name = data.name;
        this.casevault.description = data.description;
        this.casevault.endpoint = data.endpoint;
      })
      .catch(error => console.log(error))
  }

  // Create a new casevault registration
  save() {

    // add validation
    if (this.casevault.name == "" || this.casevault.endpoint == "")
      return;

    if (this.isNew) {
      //New casevault
      this.dataService.add(this.casevault)
        .then(result => this.router.navigate(['/manage/casevaults']))
        .catch(error => console.log(error))
    } else {
      let casevault = this.casevault;
      casevault.id = this.id;
      this.dataService.update(casevault)
        .then(result => this.router.navigate(['/manage/casevaults']))
        .catch(error => console.log(error))
      //Update existing casevault
    }
  }
}
