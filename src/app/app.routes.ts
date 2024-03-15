import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-admin/app-login/app-login.component';
import { AppHomeComponent } from './app-admin/app-home/app-home.component';
import { guardGuard } from './route-guard/guard.guard';
import { AppClientSignupComponent } from './app-client-signup/app-client-signup.component';
import { AppNavbarComponent } from './app-admin/app-navbar/app-navbar.component';

export const routes: Routes = [
  {path:'admin-nav',component:AppNavbarComponent},
  {path:'',component:AppNavbarComponent}
    // // { path: 'login', component: AppLoginComponent },
    // { path: '', component: AppLoginComponent },
    // { path: 'login', component: AppLoginComponent },
    // {
    //   path: 'control-panel',
    //   component: AppHomeComponent,
    //   // canActivate: [guardGuard],
    //   children: [
    //     { path: 'client-signup', component: AppClientSignupComponent },
    //     ],
    // },
];
