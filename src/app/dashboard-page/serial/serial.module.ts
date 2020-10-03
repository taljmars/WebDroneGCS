import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SerialDialogView } from './serial.dialog';
import { SerialStatView } from './serial.stat';
import { SerialChartsView } from './serial.charts';
import { SerialPacketsPieView } from './serial.packets.pie';
import { DroneScannerService } from './dronescanner.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';

import { HttpClientModule } from '@angular/common/http';
import {MatDialogRef, MatDialogActions} from "@angular/material";
import {MatDialogModule} from '@angular/material/dialog';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatSelectModule} from '@angular/material/select';

import { ChartsModule, WavesModule } from 'angular-bootstrap-md'

import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    MatSelectModule,
    ChartsModule, WavesModule,MatCheckboxModule,
  ],
  declarations: [ SerialDialogView, SerialStatView, SerialChartsView, SerialPacketsPieView],
  providers: [],
  exports: [SerialDialogView, SerialStatView, SerialChartsView, SerialPacketsPieView],
  // bootstrap: [ ]
  bootstrap: [ SerialDialogView ]
})
export class SerialModule {
  constructor() {console.log("In SerialModule constructor");}
}
