import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'app-login-facebook',
  templateUrl: './login-facebook.component.html',
  styleUrls: ['./login-facebook.component.css']
})
export class LoginFacebookComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
        .params
        .switchMap((params) => {
          const FaceId = params['id'];
          return this._authService.loginFacebook(FaceId);
        })
        .subscribe((data: any) => {
          if (data.success) {
            this._authService.localLogin(data.info.name, data.info.id, data.info.token, null, data.info.imageURL);
            this._router.navigate(['home']);
          } else {
            console.log(data.errors);
            this._router.navigate(['login']);
          }
        });
  }

}
