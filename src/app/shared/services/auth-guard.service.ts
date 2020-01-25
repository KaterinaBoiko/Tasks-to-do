import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Manager } from '../models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService) { }

  canActivate(): boolean {
    let authorizedPerson = this.loginService.getAuthorizedPerson();
    if (authorizedPerson == null) {
      this.router.navigateByUrl(`/`);
      return false;
    }
    return true;
  }
}
