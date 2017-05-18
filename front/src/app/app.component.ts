import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SharedService ],
})
export class AppComponent implements OnInit {

  public firstname: string;
  public lastname: string;
  user: any = false;

  constructor(private _authService:AuthService,private route: ActivatedRoute) {

  }

  ngOnInit()
  {
    // this.user = this._authService.loggedUser;
    this.user = this._authService.getLoggedUser();
  }

  logout()
  {
    this._authService.logout();
    location.assign('http://localhost:4200/login');
  }
}
