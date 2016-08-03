import { provideRouter, RouterConfig }  from '@angular/router';
import {ImportComponent} from './import.component';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {PatientsComponent} from './patients.component';
import {PatientDetailsComponent} from './patient-detail.component';
import {PatientAddComponent} from './patient-add.component';
import {SettingsComponent} from './settings.component';
import {AuthService} from './auth.service';

const routes: RouterConfig = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'import',
    component: ImportComponent,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patient',
    component: PatientsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'patient/new',
    component: PatientAddComponent,
    canActivate: [AuthService]
  },
  {
    path: 'patient/:id',
    component: PatientDetailsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthService]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthService
];
