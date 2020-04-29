import {ApiService} from '../api.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

export abstract class LoginPageComponent {

  email = 'peter@klaven';
  password = 'cityslicka';

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
