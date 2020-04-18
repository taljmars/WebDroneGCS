import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SerialDialogView } from './serial.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';

import { HttpClientModule } from '@angular/common/http';
import {MatDialogRef, MatDialogActions} from "@angular/material";
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
  ],
  declarations: [ SerialDialogView ],
  providers: [],
  exports: [SerialDialogView],
  // bootstrap: [ ]
  bootstrap: [ SerialDialogView ]
})
export class SerialModule {
  constructor() {console.log("In SerialModule constructor");}
}
