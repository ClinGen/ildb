import { Component } from '@angular/core';

export class BeaconQuery {
  build: string;
  chrom: string;
  position: number;
  bases: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>Reference Build {{beaconQuery.build}}!</h2>
    <div><label>id: </label>{{beaconQuery.chrom}}:{{beaconQuery.position}} A>{{beaconQuery.mutation}}</div>
    <div>
      <label>chromosome: </label>
      <input [(ngModel)]="beaconQuery.chrom">
      <label>position: </label>
      <input [(ngModel)]="beaconQuery.position">
      <label>bases: </label>
      <input [(ngModel)]="beaconQuery.bases">
    </div>
    <div *ngIf="beaconQuery.position == 15118 && beaconQuery.chrom == 'chr1'">
      <div>
        <label>clinic 1</label>
      </div><div>
        <label>clinic 2</label>
      </div>
    </div>
    `
})

export class AppComponent {
  title = 'Beacon Search Test';
  beaconQuery: BeaconQuery = {
    build: "GRCh37",
    chrom: 'chr1',
    position: 15118,
    bases: "A>G"
  };
}