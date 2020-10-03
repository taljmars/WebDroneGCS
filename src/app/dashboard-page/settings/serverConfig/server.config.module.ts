import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { ServerConfig } from './server.config.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material';

import {MatGridListModule} from '@angular/material/grid-list';

import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';
import { CheckboxModule, TableModule, WavesModule, IconsModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './../../../services/config/requestInterceptor';


@NgModule({
  imports: [
    BrowserModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatRadioModule,
    MatListModule,
    InputsModule,
    FormsModule,
    MatDividerModule,

    ButtonsModule,
    WavesModule,
  ],
  declarations: [ ServerConfig ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  exports: [ServerConfig],
  // bootstrap: [ ]
  bootstrap: [ ServerConfig ]
})
export class ServerConfigModule {
  constructor() {console.log("In ServerConfigModule constructor");}
}
