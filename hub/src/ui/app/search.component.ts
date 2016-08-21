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
  template: `
  <div class="row">
    <div class="col-md-4">
      <label>Chromosome</label>
      <input [(ngModel)]="beaconQuery.chrom" class="form-control">
    </div>
    <div class="col-md-4">
      <label>Position</label>
      <input [(ngModel)]="beaconQuery.position" class="form-control">
    </div>
    <div class="col-md-4">
      <label>Allele</label>
      <input [(ngModel)]="beaconQuery.allele" class="form-control">
    </div>
    <div class="col-md-12">
      <button type="button" (click)="find()" class="btn btn-theme"><i class="fa fa-search"></i> Search</button>
    </div>
  </div>
    <div *ngFor="let item of queryResults">
    {{item.beacon}} - {{item.result.count}}
    </div>`,
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
