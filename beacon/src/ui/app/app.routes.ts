import { provideRouter, RouterConfig }  from '@angular/router';
import {ImportComponent} from './import.component';
import {HomeComponent} from './home.component';

const routes: RouterConfig = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'import',
    component: ImportComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
