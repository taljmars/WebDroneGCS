import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { DroneParams } from './droneparams.component';

import { MatButtonModule } from '@angular/material/button';

import { CheckboxModule, TableModule, WavesModule, IconsModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';
// import { InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  imports: [
    BrowserModule,
    TableModule,
    WavesModule,
    IconsModule,
    InputsModule,
    FormsModule,
    CheckboxModule,
    MatSelectModule,
    ButtonsModule,
    // MDBBootstrapModule.forRoot(),
  ],
  declarations: [ DroneParams ],
  providers: [],
  exports: [DroneParams],
  // bootstrap: [ ]
  bootstrap: [ DroneParams ]
})
export class DroneParamsModule {
  constructor() {console.log("In SettingsModule constructor");}
}
