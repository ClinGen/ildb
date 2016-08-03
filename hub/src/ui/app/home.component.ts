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
    <h1>{{title}}</h1>
    <h2>Reference Build {{beaconQuery.build}}!</h2>
    <div><label>id: </label>{{beaconQuery.chrom}}:{{beaconQuery.position}} {{beaconQuery.allele}}</div>
    <div>
      <label>chromosome: </label>
      <input [(ngModel)]="beaconQuery.chrom">
      <label>position: </label>
      <input [(ngModel)]="beaconQuery.position">
      <label>allele: </label>
      <input [(ngModel)]="beaconQuery.allele">
      <button type="button" (click)="find()">Query</button> 
    </div>
    <div *ngFor="let item of queryResults">
    {{item.beacon}} - {{item.result.count}}
    </div>`
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
