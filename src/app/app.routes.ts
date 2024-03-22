import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-admin/app-login/app-login.component';
import { AppHomeComponent } from './app-admin/app-home/app-home.component';
import { guardGuard } from './route-guard/guard.guard';
import { AppClientSignupComponent } from './app-client-signup/app-client-signup.component';
import { AppNavbarComponent } from './app-admin/app-navbar/app-navbar.component';
import { AppNavbarMenueComponent } from './app-admin/app-navbar-menue/app-navbar-menue.component';

export const routes: Routes = [
  { path: '', component: AppLoginComponent },
  { path: 'login', component: AppLoginComponent, pathMatch: 'full' },
  // { path: '', redirectTo: 'admin-nav', pathMatch: 'full' }, // Redirect to 'admin-nav' if path is empty
  {
    path: 'admin-nav',
    component: AppNavbarComponent,
    canActivate: [guardGuard], // Set AppNavbarComponent as the component for the root path 'admin-nav'
    children: [
      { path: 'signup', component: AppClientSignupComponent },
      { path: 'menu', component: AppNavbarMenueComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, // Redirect to 'admin-nav' for any other unmatched routes
];
