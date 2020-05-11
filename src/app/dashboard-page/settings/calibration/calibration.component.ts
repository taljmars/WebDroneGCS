import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css']
})
export class Calibration {

  events: string[] = [];

  constructor(){
  }

}
