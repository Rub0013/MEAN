import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.getLoggedUser()) {
          return new Observable<boolean>(observer => {
              this._authService.isAuthenticated().subscribe(data => {
                  if (data) {
                      observer.next(true);
                  } else {
                      this.router.navigate(['login']);
                      observer.next(false);
                  }
              });
          });
      } else {
          this.router.navigate(['login']);
          return false;
      }
  }
}
