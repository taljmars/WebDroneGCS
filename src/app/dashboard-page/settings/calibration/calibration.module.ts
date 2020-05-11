import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { Calibration } from './calibration.component';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ Calibration ],
  providers: [],
  exports: [Calibration],
  // bootstrap: [ ]
  bootstrap: [ Calibration ]
})
export class CalibrationModule {
  constructor() {console.log("In CalibrationModule constructor");}
}
