import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {Dash} from './dashboard-page/dashboard-page.component';

import { MapView } from './dashboard-page/mapView/mapview.component';
import { CamView } from './dashboard-page/cameraView/camview.component';
import { SerialView } from './dashboard-page/serial/serial.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: Dash,
    // canActivate: [NeedAuthGuard]
    // children: [
    //   {
    //     path: 'cam',
    //     component: CamViewModule,
    // },
    // {
    //     path: 'map',
    //     component: MapViewModule,
    // },
    // {
    //     path: '',
    //     component: MapViewModule,
    // } 
    // ]
  },{
    path: 'cam',
    component: CamView,
},
{
  path: 'serial',
  component: SerialView,
},
{
    path: 'map',
    component: MapView,
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
  imports: [CommonModule, RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
