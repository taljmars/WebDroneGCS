import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponentView } from './alerts/alerts.component';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    durationInSeconds = 5;

    constructor (private _snackBar: MatSnackBar) {

    }

    openSnackBar(msg: string) {
        // this._snackBar.openFromComponent(AlertsComponentView, {
        //   duration: this.durationInSeconds * 1000,
        // });
        this._snackBar.open(msg, "Hide", {
            duration: this.durationInSeconds * 1000,
          });
    }

}