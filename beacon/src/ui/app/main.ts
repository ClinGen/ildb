// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import {provide} from '@angular/core';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  JwtHelper,
  CookieService
]);