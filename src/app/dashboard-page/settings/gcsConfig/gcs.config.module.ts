import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { GcsConfig, GcsConfigMobile, GcsConfigDesktop } from './gcs.config.component';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule, ModalModule, IconsModule, CardsModule } from 'angular-bootstrap-md';
import { InputsModule, WavesModule, ButtonsModule, CheckboxModule, MDBBootstrapModule } from 'angular-bootstrap-md'
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  imports: [
    BrowserModule,
    InputsModule,
    WavesModule,
    ButtonsModule,
    CheckboxModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,MatCardModule,

    ModalModule, IconsModule, MatCheckboxModule,

    CardsModule, WavesModule, ButtonsModule,

  ],
  declarations: [ GcsConfigMobile, GcsConfigDesktop ],
  providers: [],
  exports: [GcsConfigMobile, GcsConfigDesktop],
  bootstrap: [ ]
  // bootstrap: [ GcsConfig ]
})
export class GcsConfigModule {
  constructor() {console.log("In GcsConfigModule constructor");}
}
