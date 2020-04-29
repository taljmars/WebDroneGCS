import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login-page',
//   templateUrl: './login-page.component.html',
//   styleUrls: ['./login-page.component.css']
// })
export abstract class LoginPageComponent {

  email = 'peter@klaven';
  password = 'cityslicka';
  address = "127.0.0.1"
  port = 8080

  constructor(protected api: ApiService, protected user: UserService, protected router: Router) {
  }

  tryLogin() {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.user.setToken(r.token);
            // this.api.loggedIn = true;
            this.router.navigateByUrl('/dashboard');
          }
        },
        r => {
          alert(r.error.error);
          this.user.setToken("Dummy");
          this.router.navigateByUrl('/dashboard');
        });
  }

}
