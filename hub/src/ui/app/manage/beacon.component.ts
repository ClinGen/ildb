import { Component, OnInit } from '@angular/core';
import { TenantService } from './beacon.services';

// Display beacon id, name, query count (use/issued), users status
@Component({
  template: `
    <h2>Tenants List</h2>
    <div class="demo-list-action mdl-list" style="width:400px">
      <div *ngFor="let item of tenants" class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
          <a routerLink="/tenant/{{item.id}}">
          <span>{{item.name}}</span>
          </a>
        </span>
        <a class="mdl-list__item-secondary-action" (click)="delete(item.id)"><i class="material-icons">delete</i></a>
      </div>
      <div></div>
    </div>
    <br/><br/>
    <a href="#" routerLink="/tenants/new">add tenant</a>
    `,
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
