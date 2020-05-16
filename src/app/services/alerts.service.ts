import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponentView } from '../alerts/alerts.component';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    durationInSeconds = 5;

    constructor (private _snackBar: MatSnackBar) {

    }

    private openSnackBar(msg: string) {
        // this._snackBar.openFromComponent(new AlertsComponentView(),{
        //   duration: this.durationInSeconds * 1000,
        // });
        this._snackBar.open(msg, "Hide", {
            duration: this.durationInSeconds * 1000,
          });
    }

    promptError(msg: string) {
        this.openSnackBar(msg)
    }

    promptSuccess(msg: string) {
        this.openSnackBar(msg)
    }

    promptInfo(msg: string) {
        this.openSnackBar(msg)
    }

}