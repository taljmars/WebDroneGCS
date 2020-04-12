import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';



const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    // canActivate: [NeedAuthGuard]
  },
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
];


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
