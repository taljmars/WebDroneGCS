import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'user-config',
  templateUrl: './user.config.component.html',
  styleUrls: ['./user.config.component.css']
})
export class UserConfig {

  events: string[] = [];

  constructor(){
  }

}
