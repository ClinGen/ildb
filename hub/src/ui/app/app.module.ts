import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { HttpModule, XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { routing } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }   from './app.component';
import { SearchComponent } from './search.component';
import { LoginComponent } from './login.component';
import { BeaconComponent } from './manage/beacon.component';
import { BeaconEditComponent } from './manage/beacon-edit.component';
import { SettingsComponent } from './manage/settings.component';
import { RequestAccessComponent, RequestThankYouComponent } from './request-access.component';

import {AuthService} from './auth.service';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    BeaconComponent,
    BeaconEditComponent,
    SettingsComponent,
    RequestAccessComponent,
    RequestThankYouComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
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
