import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeaconService } from './beacon.services';

// Display beacon id, name, query count (use/issued), users status
@Component({
  templateUrl: '/app/manage/beacon.component.html',
  providers:[BeaconService]
})

export class BeaconComponent implements OnInit {

  organizations = [];

  constructor (
    private router: Router,
    private dataService: BeaconService) {
  }

  ngOnInit() {
    this.getBeacons();
  }

  getBeacons() {
    this.dataService.getList()
      .then(organizations => this.organizations = organizations)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.delete(id)
      .then(data => this.getBeacons())
      .catch(error => console.log(error))
  }
}
