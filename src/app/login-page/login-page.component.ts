import {ApiService} from '../api.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {AlertsService} from '../alerts.service'

export abstract class LoginPageComponent {

  email = 'peter@klaven';
  password = 'cityslicka';

  constructor(
    protected api: ApiService, 
    protected user: UserService, 
    protected router: Router,
    protected alertsService: AlertsService,
  ) {
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

}
