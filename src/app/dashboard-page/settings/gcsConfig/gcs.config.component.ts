import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'gcs-config',
  templateUrl: './gcs.config.component.html',
  styleUrls: ['./gcs.config.component.css']
})
export class GcsConfig {

  events: string[] = [];

  constructor(){
  }

}
