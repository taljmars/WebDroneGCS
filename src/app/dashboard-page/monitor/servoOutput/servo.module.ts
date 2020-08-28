import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { ServoView } from './servo.component';
import { ChartsModule } from 'angular-bootstrap-md'

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

    ChartsModule, 
    WavesModule,
    // MDBBootstrapModule.forRoot(),
  ],
  declarations: [ ServoView ],
  providers: [],
  exports: [ServoView],
  // bootstrap: [ ]
  bootstrap: [ ServoView ]
})
export class ServoModule {
  constructor() {console.log("In ServoModule constructor");}
}
