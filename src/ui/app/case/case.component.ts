import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseService } from './case.services';

@Component({
  templateUrl:'case.component.html',
    providers:[CaseService]
})

export class CaseComponent implements OnInit {
  
  public filterQuery = "";
  cases = [];

  constructor (
    public router: Router,
    private dataService: CaseService) {
  }

  ngOnInit() {
    this.getCases();
  }
  
  getCases() {
    this.dataService.getCaseList()
      .then(cases => this.cases = cases)
      .catch(error => console.log(error))
  }

  delete(id) {
    this.dataService.deleteCase(id)
      .then(data => this.getCases())
      .catch(error => console.log(error))
  }
}
