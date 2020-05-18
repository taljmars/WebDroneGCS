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

    private openSnackBar(msg: string, style: string) {
        this._snackBar.openFromComponent(AlertsComponentView,{
            data: {
                message: msg,
                type: style,
            },
            duration: this.durationInSeconds * 1000,
            panelClass: [style]
        });
        // this._snackBar.open(msg, "Hide", {
        //     duration: this.durationInSeconds * 1000,
        //   });
    }

    promptError(msg: string) {
        this.openSnackBar(msg, "error-toast")
    }

    promptSuccess(msg: string) {
        this.openSnackBar(msg, "success-toast")
    }

    promptInfo(msg: string) {
        this.openSnackBar(msg, "info-toast")
    }

}