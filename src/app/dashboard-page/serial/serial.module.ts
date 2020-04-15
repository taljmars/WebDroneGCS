import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { SerialView } from './serial.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ SerialView ],
  providers: [],
  exports: [SerialView],
  // bootstrap: [ ]
  bootstrap: [ SerialView ]
})
export class SerialModule {
  constructor() {console.log("In SerialModule constructor");}
}
