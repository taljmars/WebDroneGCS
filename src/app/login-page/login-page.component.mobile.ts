import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/users/user.service';
import {Router} from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.mobile.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponentMobile extends LoginPageComponent  {

  constructor(protected api: ApiService, protected user: UserService, protected router: Router, protected alertsService: AlertsService ) {
    super(api,user, router, alertsService)
    window.addEventListener("orientationchange", function() {
      // Announce the new orientation number
      alert(screen.orientation);
      if (this.window.orientation != 0) {
        document.documentElement.requestFullscreen();
      }
    }, false);
  }

}
