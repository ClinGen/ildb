import { Routes, RouterModule }  from '@angular/router';
import {AuthService} from './auth.service';
import {SearchComponent} from './search.component';
import {LoginComponent} from './login.component';
import {BeaconComponent} from './manage/beacon.component';
import {BeaconEditComponent} from './manage/beacon-edit.component';
import {SettingsComponent} from './manage/settings.component';
import {RequestAccessComponent, RequestThankYouComponent} from './request-access.component';

const appRoutes: Routes = [
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
    component: BeaconComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manage/beacons/:id',
    component: BeaconEditComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manage/settings',
    component: SettingsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'requestaccess',
    component: RequestAccessComponent
  },
  {
    path: 'thankyou',
    component: RequestThankYouComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
