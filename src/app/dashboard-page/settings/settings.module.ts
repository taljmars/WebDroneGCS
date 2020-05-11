import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Settings } from './settings.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DroneParamsModule} from './droneParams/droneparams.module'
import {UserConfigModule} from './userConfig/user.config.module'

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { GcsConfigModule } from './gcsConfig/gcs.config.module';
import { CalibrationModule } from './calibration/calibration.module';


@NgModule({
  imports: [
    BrowserModule,
    
    MatSidenavModule,
    DroneParamsModule,
    UserConfigModule,
    GcsConfigModule,
    CalibrationModule,

    MatButtonToggleModule,
  ],
  declarations: [ Settings ],
  providers: [],
  exports: [Settings],
  // bootstrap: [ ]
  bootstrap: [ Settings ]
})
export class SettingsModule {
  constructor() {console.log("In SettingsModule constructor");}
}
