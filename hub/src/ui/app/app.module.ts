import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';
import { SearchComponent } from './search.component';

import { HTTP_PROVIDERS, Http } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { APP_ROUTER_PROVIDERS } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelper,
    CookieService
  ]
})
export class AppModule { }
