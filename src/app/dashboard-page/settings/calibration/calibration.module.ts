import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { CalibrationMobile } from './calibration.component.mobile';
import { CalibrationDesktop } from './calibration.component.desktop';

import {MagnometerModule} from './magnometer/magnometer.module'

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule, ButtonsModule, CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule, IconsModule, ChartsModule } from 'angular-bootstrap-md';
import { from } from 'rxjs';

@NgModule({
  imports: [
    MagnometerModule,
    
    BrowserModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
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
