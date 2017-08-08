import { Component } from '@angular/core';

@Component({
  template: `
    <h2>{{title}}</h2>
    <div>
    <a href="/api/auth/getauthrequest">LOGIN</a> is required.
    </div>
    <br/>
    <div>
    <a href="/#/requestaccess">Send a request for you organization to participate</a>
    </div>
    `
})

export class LoginComponent {
  title = 'Login';
}
