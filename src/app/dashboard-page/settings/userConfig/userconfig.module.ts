import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { UserConfig } from './userconfig.component';

import { MatButtonModule } from '@angular/material/button';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ UserConfig ],
  providers: [],
  exports: [UserConfig],
  // bootstrap: [ ]
  bootstrap: [ UserConfig ]
})
export class UserConfigModule {
  constructor() {console.log("In UserConfigModule constructor");}
}
