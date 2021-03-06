import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { StatusMapView } from './statusMap';

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
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    MatSelectModule,
    ChartsModule, WavesModule,MatTableModule
  ],
  declarations: [ StatusMapView ],
  providers: [],
  exports: [StatusMapView],
  // bootstrap: [ ]
  bootstrap: [ StatusMapView ]
})
export class StatusMapModule {
  constructor() {console.log("In StatusMapModule constructor");}
}
