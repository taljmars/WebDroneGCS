/// <reference path="../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef,   
  DocumentRef, MapServiceFactory, 
  BingMapAPILoaderConfig, BingMapAPILoader, 
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import {FormsModule} from '@angular/forms';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule } from 'angular-bootstrap-md';

// import { HttpModule } from '@angular/http';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Button } from 'protractor';

import { AppRoutingModule } from './app-routing.module';

import {LoginPageModule} from './login-page/login-page.module';
import {DashModule} from './dashboard-page/dashboard-page.module';
// import {LoginPageComponent} from './login-page/login-page.component';
// import {Dash} from './dashboard-page/dashboard-page.component';
// import {RouterModule, Routes} from '@angular/router';

import {MonitorModule} from './dashboard-page/monitor/monitor.module'
import {CamViewModule} from './dashboard-page/cameraView/camview.module';
import {MapViewModule} from './dashboard-page/mapView/mapview.module';
import {SettingsModule} from './dashboard-page/settings/settings.module';
import {EditorModule} from './dashboard-page/editor/editor.module';
import {SerialModule} from './dashboard-page/serial/serial.module';
import {AboutModule} from './dashboard-page/about/about.module';
import {HelpModule} from './dashboard-page/help/help.module';


import { MapView } from './dashboard-page/mapView/mapview.component';
import { MatDialogModule } from '@angular/material';
import { Editor } from './dashboard-page/editor/editor.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppToolbarDesktop } from './toolbar/app.toolbar.desktop';
import { AppToolbarMobile } from './toolbar/app.toolbar.mobile';
import { AppToolbarModule } from './toolbar/app.toolbar.module'
import { AppComponent } from './app.component';


import {MatToolbarModule} from '@angular/material/toolbar';
// import { CanActivateRouteGuard } from './routeguard' 
import {MatDividerModule} from '@angular/material/divider';
import { CalibrationModule } from './dashboard-page/settings/calibration/calibration.module';


@NgModule({
  declarations: [
    AppComponent,
    // CanActivateRouteGuard,
  ],
  imports: [
    MatDividerModule,
    AppToolbarModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    MDBBootstrapModule.forRoot(),

    FormsModule,
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    LoginPageModule,
    DashModule,
    HttpClientModule,

    MonitorModule,
    CamViewModule,
    MapViewModule,
    SerialModule,
    SettingsModule,
    EditorModule, 
    AboutModule,
    HelpModule,

    CalibrationModule,

    MatDialogModule,
    MatToolbarModule,
    
    ModalModule, TooltipModule, PopoverModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
