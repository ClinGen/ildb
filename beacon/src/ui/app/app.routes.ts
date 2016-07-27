import { provideRouter, RouterConfig }  from '@angular/router';
import {ImportComponent} from './import.component';
import {HomeComponent} from './home.component';
import {AuthComponent} from './auth.component';
import {PatientsComponent} from './patients.component';
import {PatientDetailsComponent} from './patient-detail.component';
import {SettingsComponent} from './settings.component';

const routes: RouterConfig = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'import',
    component: ImportComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'patient',
    component: PatientsComponent
  },
  {
    path: 'patient/:id',
    component: PatientDetailsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
