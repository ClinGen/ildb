import { provideRouter, RouterConfig }  from '@angular/router';

const routes: RouterConfig = [
  {
    path: '/about'
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
