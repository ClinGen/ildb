import { Routes, RouterModule }  from '@angular/router';
import { ImportComponent} from './import/import.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login.component';
import { CaseComponent, CaseDetailsComponent } from './case/index';
import { SettingsComponent } from './settings/settings.component';
import { AuthService } from './account/auth.service';

const appRoutes: Routes = [
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
    path: 'case',
    component: CaseComponent,
    canActivate: [AuthService]
  },
  {
    path: 'case/:id',
    component: CaseDetailsComponent,
    canActivate: [AuthService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthService]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
