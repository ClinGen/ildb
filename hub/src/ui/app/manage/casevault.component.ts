import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseVaultService } from './casevault.services';

// Display casevault id, name, query count (use/issued), users status
@Component({
  templateUrl: '/app/manage/casevault.component.html',
  providers:[CaseVaultService]
})

export class CaseVaultComponent implements OnInit {

  organizations = [];

  constructor (
    private router: Router,
    private dataService: CaseVaultService) {
  }

  ngOnInit() {
    this.getCaseVaults();
  }

  getCaseVaults() {
    this.dataService.getList()
      .then(organizations => this.organizations = organizations)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.delete(id)
      .then(data => this.getCaseVaults())
      .catch(error => console.log(error))
  }
}
