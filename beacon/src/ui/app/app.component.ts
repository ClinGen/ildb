import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/app/app.component.html'
})

export class AppComponent {

}

export class BeaconQuery {
  chrom: string;
  position: number;
  allele: string;
}