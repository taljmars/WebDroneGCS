import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { GcsConfig } from './gcs.config.component';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import { InputsModule, WavesModule, ButtonsModule, CheckboxModule, MDBBootstrapModule } from 'angular-bootstrap-md'


@NgModule({
  imports: [
    BrowserModule,
    InputsModule,
    WavesModule,
    ButtonsModule,
    CheckboxModule,
    MDBBootstrapModule.forRoot(),

  ],
  declarations: [ GcsConfig ],
  providers: [],
  exports: [GcsConfig],
  // bootstrap: [ ]
  bootstrap: [ GcsConfig ]
})
export class GcsConfigModule {
  constructor() {console.log("In GcsConfigModule constructor");}
}
