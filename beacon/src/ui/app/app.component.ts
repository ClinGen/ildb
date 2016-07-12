import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

export class BeaconQuery {
  build: string;
  chrom: string;
  position: number;
  allele: string;
}

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
    `
})

// Set default query
export class AppComponent {
  title = 'Beacon Search Test';
}