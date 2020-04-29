import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'UserConfig',
  templateUrl: './userconfig.component.html',
  styleUrls: ['./userconfig.component.css']
})
export class UserConfig {

  events: string[] = [];

  constructor(){
  }

}
