import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Manager } from '../models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authorizedPerson = this.loginService.getAuthorizedPerson();
    if (authorizedPerson) {
      if ('desktopsId' in authorizedPerson && route.url.toString()=='desktop') {
        this.router.navigate(['/manager']);
        return false;
      }
      if (!('desktopsId' in authorizedPerson) && route.url.toString()=='manager') {
        console.log(route);
        console.log(state);
        this.router.navigate(['/desktop']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
