import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Settings } from './settings.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DroneParamsModule} from './droneParams/droneparams.module'
import {UserConfigModule} from './userConfig/userconfig.module'

import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  imports: [
    BrowserModule,
    
    MatSidenavModule,
    DroneParamsModule,
    UserConfigModule,

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
