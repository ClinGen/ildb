import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
    `
})

export class AppComponent {

}

export class BeaconQuery {
  chrom: string;
  position: number;
  allele: string;
}