import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { HudView } from './hud';

import {MatDialogModule} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule, ButtonsModule, CardsModule, WavesModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


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
    MatButtonToggleModule,
    ModalModule, TooltipModule, PopoverModule, IconsModule,

    CardsModule, WavesModule, ButtonsModule, ChartsModule,
  ],
  declarations: [ HudView ],
  providers: [],
  exports: [HudView],
  // bootstrap: [ ]
  bootstrap: [ HudView ]
})
export class HudModule {
  constructor() {console.log("In HudModule constructor");}
}
