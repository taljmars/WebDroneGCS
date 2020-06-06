import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { CalibrationMobile } from './calibration.component.mobile';
import { CalibrationDesktop } from './calibration.component.desktop';


import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule, ButtonsModule, CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule, IconsModule, ChartsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,
    MatSelectModule,
    MatCardModule,

    ModalModule, TooltipModule, PopoverModule, IconsModule,

    CardsModule, WavesModule, ButtonsModule, ChartsModule,
  ],
  declarations: [ CalibrationMobile, CalibrationDesktop ],
  providers: [],
  exports: [CalibrationMobile, CalibrationDesktop],
  bootstrap: [ ]
  // bootstrap: [ Calibration ]
})
export class CalibrationModule {
  constructor() {console.log("In CalibrationModule constructor");}
}
