import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { OpenChartView } from './openChart';
import { ChartsModule } from 'angular-bootstrap-md'

import { MatButtonModule } from '@angular/material/button';

import { CheckboxModule, TableModule, WavesModule, IconsModule, InputsModule, ButtonsModule, CardsModule } from 'angular-bootstrap-md';
// import { InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material';


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
    
    // MatCardModule,
    CardsModule,

    ChartsModule, 
    WavesModule,
    // MDBBootstrapModule.forRoot(),
  ],
  declarations: [ OpenChartView ],
  providers: [],
  exports: [OpenChartView],
  // bootstrap: [ ]
  bootstrap: [ OpenChartView ]
})
export class OpenChartModule {
  constructor() {console.log("In OpenChartModule constructor");}
}
