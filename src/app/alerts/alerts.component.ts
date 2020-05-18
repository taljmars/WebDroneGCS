import {Component, Inject} from '@angular/core';
import {MatSnackBar, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';


@Component({
    selector: 'alerts-toast',
    templateUrl: 'alerts.component.html',
    styles: ['alerts.component.css'],
})
export class AlertsComponentView {

    msg: String = ""
    type: any;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
        console.log("print " + data)
        this.msg = data.message
        this.type = data.type
    }
}