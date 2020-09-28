import { Help } from "./help.component";
import { NgModule } from "@angular/core";
import {BrowserModule} from '@angular/platform-browser'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  imports: [
    BrowserModule,
    MatIconModule,
    MatExpansionModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [ Help ],
  providers: [  ],
  exports: [Help],
  bootstrap: [ Help ]
})
export class HelpModule {
  constructor() {console.log("In HelpModule constructor");}
}
