import { provideRouter, RouterConfig }  from '@angular/router';
import {ImportComponent} from './import.component';
import {HomeComponent} from './home.component';

const routes: RouterConfig = [
  {
    path: 'import',
    component: ImportComponent
  },
  {
    path:'',
    component: HomeComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
