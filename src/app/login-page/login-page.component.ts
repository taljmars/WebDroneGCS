import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AlertsService} from '../services/alerts.service'
import { ViewChild } from '@angular/core';

export abstract class LoginPageComponent {

  @ViewChild("email", {static: false})
  public email: any = '';

  @ViewChild("password", {static: false})
  public password: any = '';

  constructor(
    protected api: ApiService, 
    protected user: UserService, 
    protected router: Router,
    protected alertsService: AlertsService,
  ) {
  }

  tryLogin() {
    this.api.login(
      this.getEmail(),
      this.getPassword()
    )
      .subscribe(
        r => {
          if (r.token) {
            this.user.setToken(r.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        r => {
          // alert(r.error.error);
          this.alertsService.openSnackBar("Failed to login")
          this.user.setToken("Dummy");
          this.router.navigateByUrl('/dashboard');
        });
  }

  getPassword(): string {
    return this.password.nativeElement.value;
  }
  getEmail(): string {
    return this.email.nativeElement.value;
  }
}
