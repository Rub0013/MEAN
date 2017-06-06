import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  facebookLoginHref = 'http://localhost:8886/auth/facebook';

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {}

  ngOnDestroy() {
  }

  onSubmit(form: any) {

    const log = form.value.login;
    const pass = form.value.pass;
    this._authService.login(log, pass).subscribe(data => {
      if (data.success) {
        this._authService.localLogin(data.info.name, data.info.id, data.info.token);
        this._router.navigate(['home']);
      } else {
        console.log(data.errors);
      }
    });
  }

}
