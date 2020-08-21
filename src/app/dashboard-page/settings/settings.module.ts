import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SettingsDesktop } from './settings.component.desktop';
import { SettingsMobile } from './settings.component.mobile';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DroneParamsModule} from './droneParams/droneparams.module'
import {UserConfigModule} from './userConfig/user.config.module'
import {ServerConfigModule} from './serverConfig/server.config.module'

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { GcsConfigModule } from './gcsConfig/gcs.config.module';
import { CalibrationModule } from './calibration/calibration.module';


@NgModule({
  imports: [
    BrowserModule,
    
    MatSidenavModule,
    DroneParamsModule,
    UserConfigModule,
    ServerConfigModule,
    GcsConfigModule,
    CalibrationModule,

    MatButtonToggleModule,

    MDBBootstrapModule.forRoot(),

  ],
  declarations: [ SettingsMobile, SettingsDesktop ],
  providers: [],
  exports: [SettingsMobile, SettingsDesktop],
  bootstrap: [ ]
  // bootstrap: [ Settings ]
})
export class SettingsModule {
  constructor() {console.log("In SettingsModule constructor");}
}
