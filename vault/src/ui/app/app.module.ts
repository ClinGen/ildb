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
import {DataTableModule} from "angular2-datatable";

import { AuthService } from './account/auth.service';

import { UserComponent } from './account/user.component';
import { ImportComponent } from './import/import.component';
import { LoginComponent } from './account/login.component';
import { CaseComponent } from './case/case.component';
import { CaseDetailsComponent } from './case/case-detail.component';
import { SettingsComponent } from './settings/settings.component';

import { CaseService } from './case/case.services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    DataTableModule
  ],
  declarations: [
    AppComponent,
    UserComponent,
    ImportComponent,
    LoginComponent,
    CaseComponent,
    CaseDetailsComponent,
    SettingsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    CaseService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    JwtHelper,
    CookieService
  ]
})
export class AppModule { }
