import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { LoginPageComponent } from './login-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.mobile.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponentMobile extends LoginPageComponent  {

  constructor(protected api: ApiService, protected user: UserService, protected router: Router) {
    super(api,user, router)
  }

}
