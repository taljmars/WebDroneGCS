import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { LogView } from './log.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CheckboxModule, TableModule, WavesModule, IconsModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,
    MatSidenavModule,
    IconsModule,
    TableModule,
    InputsModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [ LogView ],
  providers: [],
  exports: [LogView],
  // bootstrap: [ ]
  bootstrap: [ LogView ]
})
export class LogsModule {
  constructor() {console.log("In LogModule constructor");}
}
