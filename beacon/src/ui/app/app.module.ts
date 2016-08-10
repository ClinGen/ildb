import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import { AppComponent }   from './app.component';
import { routing } from './app.routing';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

import {UserComponent} from './user.component';
import {AuthService} from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    UserComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelper,
    CookieService
  ]
})
export class AppModule { }
