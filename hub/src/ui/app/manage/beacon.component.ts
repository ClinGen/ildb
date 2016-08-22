import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeaconService } from './beacon.services';

// Display beacon id, name, query count (use/issued), users status
@Component({
  templateUrl: '/app/manage/beacon.component.html',
  providers:[BeaconService]
})

export class TenantsComponent implements OnInit {

  tenants = [];

  constructor (
    private router: Router,
    private dataService: BeaconService) {
  }

  ngOnInit() {
    this.getTenants();
  }

  getTenants() {
    this.dataService.getList()
      .then(tenants => this.tenants = tenants)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.delete(id)
      .then(data => this.getTenants())
      .catch(error => console.log(error))
  }
}
