import { Component, OnInit } from '@angular/core';
import { TenantService } from './beacon.services';

// Display beacon id, name, query count (use/issued), users status
@Component({
  templateUrl: '/app/manage/beacon.component.html',
  providers:[TenantService]
})

export class TenantsComponent implements OnInit {

  tenants = [];

  constructor (
    private dataService: TenantService) {
  }

  ngOnInit() {
    this.getTenants();
  }

  getTenants() {
    this.dataService.getTenantList()
      .then(tenants => this.tenants = tenants)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.deleteTenant(id)
      .then(data => this.getTenants())
      .catch(error => console.log(error))
  }
}
