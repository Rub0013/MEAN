import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class RedirectAuthenticatedGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router){}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getLoggedUser()) {
      return new Observable<boolean>(observer => {
        this._authService.isAuthenticated().subscribe(data => {
          if (data) {
            this.router.navigate(['home']);
            observer.next(false);
          } else {
            observer.next(true);
          }
        });
      });
    } else {
      return true;
    }
  }
}
