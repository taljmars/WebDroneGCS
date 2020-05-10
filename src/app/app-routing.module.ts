import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router, PreloadAllModules } from '@angular/router';


import { MapView } from './dashboard-page/mapView/mapview.component';
import { CamView } from './dashboard-page/cameraView/camview.component';
import { LogView } from './dashboard-page/log/log.component'
import { Settings } from './dashboard-page/settings/settings.component'
import { Editor } from './dashboard-page/editor/editor.component'

// import { CanActivateRouteGuard } from './routeguard' 

import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs"
import { UserService } from './services/user.service';
import { ApplicationStateService } from './application-state.service';
import { LoginPageComponentMobile } from './login-page/login-page.component.mobile';
import { LoginPageComponentDesktop } from './login-page/login-page.component.desktop';
import { DashDesktop } from './dashboard-page/dashboard-page.desktop';
import { DashMobile } from './dashboard-page/dashboard-page.mobile';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor (private user: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log("Can Activate ?")
        return this.user.isLogged()
    }
}


const appDesktopRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashDesktop,
    canActivate: [CanActivateRouteGuard]
  },{
    path: 'cam',
    component: CamView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'logs',
    component: LogView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'editor',
    component: Editor,
    canActivate: [CanActivateRouteGuard]

  },
  {
    path: 'settings',
    component: Settings,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'map',
    component: MapView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: '',
    component: LoginPageComponentDesktop
  },
  {
    path: 'login',
    component: LoginPageComponentDesktop
  },
];

const appMobileRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashMobile,
    canActivate: [CanActivateRouteGuard]
  },{
    path: 'cam',
    component: CamView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'logs',
    component: LogView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'settings',
    component: Settings,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: 'map',
    component: MapView,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: '',
    component: LoginPageComponentMobile
  },
  {
    path: 'login',
    component: LoginPageComponentMobile
  },
];


@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forRoot(appDesktopRoutes, { enableTracing: false, preloadingStrategy: PreloadAllModules }),
    RouterModule.forRoot(appMobileRoutes, { enableTracing: false, preloadingStrategy: PreloadAllModules })
  ],
  // imports: [CommonModule, RouterModule.forRoot(appMobileRoutes, { enableTracing: true, preloadingStrategy: PreloadAllModules })],
  // imports: [CommonModule],
  providers: [CanActivateRouteGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {

    console.log("Modify App routing")
    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(appMobileRoutes);
    }
    else {
      router.resetConfig(appDesktopRoutes);

    }
  }
  
}
