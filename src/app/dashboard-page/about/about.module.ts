import { About } from "./about.component";
import { NgModule } from "@angular/core";
import {BrowserModule} from '@angular/platform-browser'
import {MatDividerModule} from '@angular/material/divider';
import { IconsModule } from 'angular-bootstrap-md'


@NgModule({
  imports: [
    BrowserModule,
    MatDividerModule,
    IconsModule,
  ],
  declarations: [ About ],
  providers: [  ],
  exports: [About],
  bootstrap: [ About ]
})
export class AboutModule {
  constructor() {console.log("In AboutModule constructor");}
}
