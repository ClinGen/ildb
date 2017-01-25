import { Component, OnInit } from '@angular/core';
import {QueryService} from './query.service';

export class CaseVaultQuery {
  chrom: string;
  position: string;
  allele: string;
  clinicalIndications: string;
  populations: string;
}

@Component({
  selector: 'hub-home',
  templateUrl: '/app/search.component.html',
  providers: [QueryService]
})

export class SearchComponent implements OnInit {

  title = 'Case Vault Search';

  queryResults: any[];

  constructor(
    private queryService: QueryService) {

  }

  ngOnInit() {

  }

  find() {
    this.queryService.queryCaseVaults(this.caseVaultQuery.chrom, this.caseVaultQuery.position, this.caseVaultQuery.allele, this.caseVaultQuery.clinicalIndications, this.caseVaultQuery.populations)
      .then(queryResults => this.queryResults = queryResults)
      .catch(error => console.log(error))
  }

  caseVaultQuery: CaseVaultQuery = {
    chrom: '1',
    position: '15118',
    allele: "G",
    clinicalIndications: "",
    populations: ""
  };
}
