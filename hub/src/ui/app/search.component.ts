import { Component, OnInit } from '@angular/core';
import {QueryService} from './query.service';

export class BeaconQuery {
  chrom: string;
  position: number;
  allele: string;
  clinicalIndications: string;
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
    this.queryService.queryBeacons(this.beaconQuery.chrom, this.beaconQuery.position, this.beaconQuery.allele, this.beaconQuery.clinicalIndications)
      .then(queryResults => this.queryResults = queryResults)
      .catch(error => console.log(error))
  }

  beaconQuery: BeaconQuery = {
    chrom: '1',
    position: 15118,
    allele: "G",
    clinicalIndications: ""
  };
}
