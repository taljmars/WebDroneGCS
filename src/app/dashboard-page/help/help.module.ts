import { Help } from "./help.component";
import { NgModule } from "@angular/core";
import {BrowserModule} from '@angular/platform-browser'


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ Help ],
  providers: [  ],
  exports: [Help],
  bootstrap: [ Help ]
})
export class HelpModule {
  constructor() {console.log("In HelpModule constructor");}
}
