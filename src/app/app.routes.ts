import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-admin/app-login/app-login.component';
import { AppHomeComponent } from './app-admin/app-home/app-home.component';
import { guardGuard } from './route-guard/guard.guard';

export const routes: Routes = [
    // { path: 'login', component: AppLoginComponent },
    { path: '', component: AppLoginComponent },
    { path: 'login', component: AppLoginComponent },
    {
      path: 'control-panel',
      component: AppHomeComponent,
      canActivate: [guardGuard],
      children: [
        // { path: 'itinerary-view', component: ItineraryViewComponent },
        // { path: 'app-setting', component: AppSettingComponent },
      ],
    },
];
