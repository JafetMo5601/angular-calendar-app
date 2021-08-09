import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  
  constructor(
    private authGuardService: AuthGuardService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    if (this.authGuardService.getToken()) {
      this.router.navigateByUrl("/home");
    }
    return !this.authGuardService.getToken();
  }
  
}
