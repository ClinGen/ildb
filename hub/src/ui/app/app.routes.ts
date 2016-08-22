import { provideRouter, RouterConfig }  from '@angular/router';
import {AuthService} from './auth.service';
import {SearchComponent} from './search.component';
import {LoginComponent} from './login.component';
import {TenantsComponent} from './manage/beacon.component';
import {TenantAddComponent} from './manage/beacon-add.component';
import {SettingsComponent} from './manage/settings.component';

const routes: RouterConfig = [
  {
    path:'',
    component: SearchComponent,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manage/beacons',
    component: TenantsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manage/beacons/new',
    component: TenantAddComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manage/settings',
    component: SettingsComponent,
    canActivate: [AuthService]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthService
];
