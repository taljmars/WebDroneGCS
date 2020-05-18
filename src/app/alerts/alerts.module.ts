import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertsComponentView } from './alerts.component';
import {BrowserModule} from '@angular/platform-browser'
import {Component, NgModule, VERSION} from '@angular/core'
import { MDBBootstrapModule, ModalModule, TooltipModule, PopoverModule, IconsModule, ChartsModule } from 'angular-bootstrap-md';


@NgModule({
    imports: [
        MatSnackBarModule,
        BrowserModule,
        IconsModule,
    ],
    declarations: [ AlertsComponentView ],
    providers: [],
    exports: [AlertsComponentView],
    bootstrap: [ AlertsComponentView ]
})
export class AlertsModule { 

    constructor() {console.log("In AlertsModule constructor");}
}
