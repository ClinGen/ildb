import { provideRouter, RouterConfig }  from '@angular/router';
import {AuthService} from './auth.service';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {ManageComponent} from './manage.component';
import {TenantsComponent} from './manage/beacon.component';
import {TenantAddComponent} from './manage/beacon-add.component';

const routes: RouterConfig = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: ManageComponent,
    canActivate: [AuthService]
  },
  {
    path: 'tenants',
    component: TenantsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'tenants/new',
    component: TenantAddComponent,
    canActivate: [AuthService]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthService
];
