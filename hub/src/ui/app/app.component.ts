import { Component } from '@angular/core';

export class BeaconQuery {
  build: string;
  chrom: string;
  position: number;
  allele: string;
}

@Component({
  selector: 'my-app',
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
    </div>
    `
})

// Set default query
export class AppComponent {
  title = 'Beacon Search Test';
  beaconQuery: BeaconQuery = {
    build: "GRCh37",
    chrom: 'chr1',
    position: 15118,
    allele: "G"
  };
}