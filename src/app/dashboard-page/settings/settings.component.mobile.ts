import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';

import { DroneService, DroneEventListener } from '../../services/drone/drone.service';
import { DroneEvent } from '../../services/drone/protocol/events.component';
import { ApplicationStateService } from 'src/app/application-state.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './settings.component.mobile.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsMobile {

  constructor(
    public applicationStateService: ApplicationStateService, 
    public router: Router,
    public route: ActivatedRoute,
    ){
  }

  navigate(url: string) {
    console.log("Navigating to " + url)
    // this.router.navigateByUrl(url);
    this.router.navigate([url])
  }

}