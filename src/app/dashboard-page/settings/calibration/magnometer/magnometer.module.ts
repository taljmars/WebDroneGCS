import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { MagnometerView } from './magnometer';

import {MatDialogModule} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule, ButtonsModule, CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule, IconsModule, ChartsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ModalModule, TooltipModule, PopoverModule, IconsModule,

    CardsModule, WavesModule, ButtonsModule, ChartsModule,
  ],
  declarations: [ MagnometerView ],
  providers: [],
  exports: [MagnometerView],
  // bootstrap: [ ]
  bootstrap: [ MagnometerView ]
})
export class MagnometerModule {
  constructor() {console.log("In MagnometerModule constructor");}
}
