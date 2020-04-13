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

import { MDBBootstrapModule } from 'angular-bootstrap-md';

// import { HttpModule } from '@angular/http';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Button } from 'protractor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LoginPageModule} from './login-page/login-page.module';
import {DashModule} from './dashboard-page/dashboard-page.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {Dash} from './dashboard-page/dashboard-page.component';
// import {RouterModule, Routes} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

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
    HttpClientModule
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
