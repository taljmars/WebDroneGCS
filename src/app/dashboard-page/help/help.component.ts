import {Component, ViewChild} from '@angular/core'
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-root',
  templateUrl: './help.html',
  styleUrls: ['./help.css']
})
export class Help {

  @ViewChild(MatAccordion, {static: false}) accordion: MatAccordion;
  
  constructor() {}


}
