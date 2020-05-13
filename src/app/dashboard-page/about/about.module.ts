import { About } from "./about.component";
import { NgModule } from "@angular/core";
import {BrowserModule} from '@angular/platform-browser'


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ About ],
  providers: [  ],
  exports: [About],
  bootstrap: [ About ]
})
export class AboutModule {
  constructor() {console.log("In AboutModule constructor");}
}
