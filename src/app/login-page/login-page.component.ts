import {ApiService} from '../services/api.service';
import {UserService} from '../services/users/user.service';
import {Router} from '@angular/router';
import {AlertsService} from '../services/alerts.service'
import { ViewChild } from '@angular/core';
import { Observable, Subscribable, PartialObserver, Unsubscribable } from 'rxjs';
import { AppConstants } from "../local.storage"

export abstract class LoginPageComponent {

  @ViewChild("email", {static: false})
  public email: any = '';

  @ViewChild("password", {static: false})
  public password: any = '';

  rememberMe = false

  constructor(
    protected api: ApiService, 
    protected user: UserService, 
    protected router: Router,
    protected alertsService: AlertsService,
  ) {}

  ngOnInit() {
    let username = AppConstants.MyStorage.get(AppConstants.General.REMEMBER_USER)
    if (username != null) {
      console.log("Access with last logged user")
      this.tryLogin(username)
    }
  }

  tryLogin(user?: string) {
    let u: string = user
    if (u == null)
      u = this.getEmail();
    this.api.login(
      u,
      this.getPassword()
    )
      .subscribe(
        r => {
          if (r.token) {
            this.user.setToken(r.token, u);
            this.router.navigateByUrl('/dashboard');
            if (this.rememberMe) {
              AppConstants.MyStorage.set(AppConstants.General.REMEMBER_USER, this.getEmail())
            }
          }
        },
        e => {
          // alert(r.error.error);
          this.alertsService.openSnackBar("Failed to login")
          // this.user.setToken("Dummy");
          // this.router.navigateByUrl('/dashboard');
        },
        () => {
          console.log("Completed")
        });
  }

  getPassword(): string {
    if (this.password == null || this.password == "")
      return ""
    return this.password.nativeElement.value;
  }
  getEmail(): string {
    if (this.email == null || this.email == "")
      return ""
    return this.email.nativeElement.value;
  }
}
