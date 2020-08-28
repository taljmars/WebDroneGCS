import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { MonitorView } from './monitor';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {ServoModule} from './servoOutput/servo.module'
import {OpenChartModule} from './openChart/openChart.module'

@NgModule({
  imports: [
    BrowserModule,
    
    ServoModule,
    OpenChartModule,
    
    MatSidenavModule,

    MatButtonToggleModule,

    MDBBootstrapModule.forRoot(),

  ],
  declarations: [ MonitorView ],
  providers: [],
  exports: [ MonitorView ],
  bootstrap: [ ]
  // bootstrap: [ Settings ]
})
export class MonitorModule {
  constructor() {console.log("In MonitorModule constructor");}
}
