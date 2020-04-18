import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { LogView } from './log.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,
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
