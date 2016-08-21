import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/app/app.component.html' 

})

// Set default query
export class AppComponent {
  title = 'Beacon Search Hub';

  queryResults: any[];

  constructor (){

    }
}
