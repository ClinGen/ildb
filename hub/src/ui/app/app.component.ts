import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
    <router-outlet></router-outlet>`
})

// Set default query
export class AppComponent {
  title = 'Beacon Search Hub';

  queryResults: any[];

  constructor (){

    }
}