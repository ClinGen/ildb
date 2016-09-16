import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'request-access',
  templateUrl: '/app/request-access.component.html'
})
export class RequestAccessComponent {
  organization = {}
  beacon = {}
  constructor (
    private router: Router) {
  }
}

@Component({
  selector: 'request-thankyou',
  templateUrl: '/app/thank-you.html'
})
export class RequestThankYouComponent {
  organization = {}
  beacon = {}
  constructor() {

  }
}
