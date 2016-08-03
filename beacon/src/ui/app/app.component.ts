import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import {UserComponent} from './user.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, UserComponent],
  templateUrl: '/app/app.component.html'
})

export class AppComponent {

}
