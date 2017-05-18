import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import 'rxjs/Rx';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ SharedService ],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private _authService:AuthService, private _router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  onSubmit(form: any) {

    let log = form.value.login;
    let pass = form.value.pass;
    this._authService.login(log, pass).subscribe(data => {
      if(data.success){
        this._authService.localLogin(data.info.name, data.info.id, data.info.token);
        this._router.navigate(["home"]);
        // location.assign('http://localhost:4200/home');
      }
      else{
        console.log(data.errors);
      }
    });
  }
}
