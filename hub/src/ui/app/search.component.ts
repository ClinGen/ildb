import { Component, OnInit } from '@angular/core';
import {QueryService} from './query.service';

export class BeaconQuery {
  build: string;
  chrom: string;
  position: number;
  allele: string;
}

@Component({
  selector: 'hub-home',
  templateUrl: '/app/search.component.html' ,
    providers: [QueryService]
})

export class HomeComponent {

  title = 'Beacon Search Hub';

  queryResults: any[];

  constructor (
    private queryService: QueryService){

    }

  find(){
    this.queryService.queryBeacons(this.beaconQuery.chrom, this.beaconQuery.position, this.beaconQuery.allele)
    .then(queryResults => this.queryResults = queryResults)
    .catch(error => console.log(error))
  }

  beaconQuery: BeaconQuery = {
    build: "GRCh37",
    chrom: '1',
    position: 15118,
    allele: "G"
  };
}
