import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { CamView } from './camview.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NavbarModule, DropdownModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    BrowserModule,
    MatCardModule,
  ],
  declarations: [ CamView ],
  providers: [],
  exports: [CamView],
  // bootstrap: [ ]
  bootstrap: [ CamView ]
})
export class CamViewModule {
  constructor() {console.log("In CamViewModule constructor");}
}
