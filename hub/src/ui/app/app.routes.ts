import { Routes, RouterModule }  from '@angular/router';
import {AuthService} from './auth.service';
import {SearchComponent} from './search.component';
import {LoginComponent} from './login.component';
import {CaseVaultComponent} from './manage/casevault.component';
import {CaseVaultEditComponent} from './manage/casevault-edit.component';
import {SettingsComponent} from './manage/settings.component';
import {RequestAccessComponent, RequestThankYouComponent} from './request-access.component';
import {DeployComponent} from './deploy.component';

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
    path: 'manage/casevaults',
    component: CaseVaultComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manage/casevaults/:id',
    component: CaseVaultEditComponent,
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
  },
  {
    path: 'deploy/vault',
    component: DeployComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);
