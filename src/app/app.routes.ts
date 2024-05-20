import { Routes } from '@angular/router';
import { guardGuard } from './route-guard/guard.guard';
import { AdminLoginComponent } from './app-admin-component/admin-login-component/admin-login-component.component';
import { AppAdminComponentComponent } from './app-admin-component/app-admin-component.component';
import { ResidenceListViewComponent } from './app-admin-component/residence-list-view/residence-list-view.component';
import { AppBookingComponentComponent } from './app-booking-component/app-booking-component.component';
import { ClientLoginComponentComponent } from './app-booking-component/client-login-component/client-login-component.component';
import { AppPartnerComponentComponent } from './app-partner-component/app-partner-component.component';
import { PartnerLoginComponentComponent } from './app-partner-component/partner-login-component/partner-login-component.component';


export const routes: Routes = [

  { path: '', component: AppBookingComponentComponent, pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent, pathMatch: 'full' },
  { path: 'partner-login', component: PartnerLoginComponentComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: AppBookingComponentComponent,
    children: [
    ],
  },

  {
    path: 'admin-nav',
    component: AppAdminComponentComponent,
    canActivate: [guardGuard], children: [
      { path: 'partner-view', component: ResidenceListViewComponent },
    ],
  },

  {
    path: 'partner-home',
    component: AppPartnerComponentComponent,
    canActivate: [guardGuard],
    children: [

    ],
  },
  { path: '**', redirectTo: '' }
];
