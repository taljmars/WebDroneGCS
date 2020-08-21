import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { ServerConfig } from './server.config.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  declarations: [ ServerConfig ],
  providers: [],
  exports: [ServerConfig],
  // bootstrap: [ ]
  bootstrap: [ ServerConfig ]
})
export class ServerConfigModule {
  constructor() {console.log("In ServerConfigModule constructor");}
}
