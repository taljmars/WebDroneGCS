import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertsComponentView } from './alerts.component';
import {BrowserModule} from '@angular/platform-browser'
import {Component, NgModule, VERSION} from '@angular/core'


@NgModule({
    imports: [
        MatSnackBarModule,
        BrowserModule,
    ],
    declarations: [ AlertsComponentView ],
    providers: [],
    exports: [AlertsComponentView],
    bootstrap: [ AlertsComponentView ]
})
export class AlertsModule { 

    constructor() {console.log("In AlertsModule constructor");}
}
