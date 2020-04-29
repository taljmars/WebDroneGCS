import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
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
