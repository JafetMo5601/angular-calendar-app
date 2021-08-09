import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authGuardService: AuthGuardService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    if (!this.authGuardService.getToken()) {
      this.router.navigateByUrl("/auth");
    }
    return this.authGuardService.getToken();
  }

}
