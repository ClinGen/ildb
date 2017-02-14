import { Component } from '@angular/core';

@Component({
  template: `
    <h2>{{title}}</h2>
    <div>
    <a href="/api/auth/getauthrequest">LOGIN</a> is required.
    </div>
    `
})

export class LoginComponent {
  title = 'Login';
}