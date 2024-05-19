import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-admin/app-login/app-login.component';
import { AppHomeComponent } from './app-admin/app-home/app-home.component';
import { guardGuard } from './route-guard/guard.guard';
import { AppClientSignupComponent } from './app-client-signup/app-client-signup.component';
import { AppNavbarComponent } from './app-admin/app-navbar/app-navbar.component';
import { AppPartnerViewComponent } from './app-admin/app-navbar/app-partner-view/app-partner-view.component';
import { PartnerLoginComponent } from './app-partner/partner-login/partner-login.component';
import { PartnerNavBarComponent } from './app-partner/partner-nav-bar/partner-nav-bar.component';
import { HomeComponent } from './app-home/home/home.component';
import { NavBarComponent } from './app-home/nav-bar/nav-bar.component';
import { ClientLoginComponent } from './app-home/client-login/client-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: ClientLoginComponent },
  { path: 'admin-login', component: AppLoginComponent, pathMatch: 'full' },
  { path: 'patner-login', component: PartnerLoginComponent, pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      ],
  },
  
  {
    path: 'admin-nav',
    component: AppNavbarComponent,
    canActivate: [guardGuard],  children: [
      { path: 'partner-view', component: AppPartnerViewComponent },         
    ],
  },
  
  {
    path: 'partner-home',
    component: PartnerNavBarComponent,
    canActivate: [guardGuard], 
    children: [
             
    ],
  },
  { path: '**', redirectTo: '' }



];
