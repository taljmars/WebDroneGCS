import {Component} from '@angular/core';
import {ApiService} from '../api.service';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  page = {
    title: 'Home',
    subtitle: 'Welcome Home!',
    content: 'Some home content.',
    image: 'assets/bg.jpg'
  };

  email = 'peter@klaven';
  password = 'cityslicka';
  address = "127.0.0.1"
  port = 8080

  constructor(private api: ApiService, private customer: CustomerService, private router: Router) {
  }

  tryLogin() {
    this.api.loggedIn = true;
    this.router.navigateByUrl('/dashboard');
    // this.api.login(
    //   this.email,
    //   this.password
    // )
    //   .subscribe(
    //     r => {
    //       if (r.token) {
    //         this.customer.setToken(r.token);
    //         this.router.navigateByUrl('/dashboard');
    //       }
    //     },
    //     r => {
    //       alert(r.error.error);
    //     });
  }

}
