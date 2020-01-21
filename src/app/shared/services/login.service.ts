import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Manager } from '../models/manager.model';
import { UserService } from './user.service';
import { ManagerService } from './manager.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DesktopService } from './desktop.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authorizedPerson: User | Manager | null;

  private authorizedPersonSubject = new Subject<User | Manager | null>();
  public userEmitter = this.authorizedPersonSubject.asObservable();

  // userEmitChange(): Observable<any> {
  //   console.log(this.authorizedPersonSubject);
  //   return this.authorizedPersonSubject.asObservable();
  // }

  constructor(private userService: UserService,
    private managerService: ManagerService,
    private deskService: DesktopService,
    private router: Router) {
    this.authorizedPerson = JSON.parse(localStorage.getItem('authorizedPerson'));
    //this.authorizedPerson = this.userService.getUsers()[0];//!!!
  }

  getAuthorizedPerson(): any {
    return this.authorizedPerson;
  }

  tryToSignIn(username: string, password: string): boolean {
    let currUser = this.userService.findUser(username, password);
    if (!currUser) {
      let currManager = this.managerService.findManager(username, password);
      if (!currManager) {
        localStorage.setItem('authorizedPerson', null);
        this.router.navigateByUrl(`/`);
        return false;
      }
      else {
        this.authorizedPerson = currManager;
        this.authorizedPersonSubject.next(this.authorizedPerson);
        this.router.navigateByUrl('/manager');
        localStorage.setItem('authorizedPerson', JSON.stringify(this.authorizedPerson));
        return true;
      }
    }
    else {
      this.authorizedPerson = currUser;
      this.authorizedPersonSubject.next(this.authorizedPerson);
      this.router.navigateByUrl(`/desktop`);
      localStorage.setItem('authorizedPerson', JSON.stringify(this.authorizedPerson));
      let currDesktopId = this.deskService.getDesktopsByUserId(this.authorizedPerson.id)[0].id;
      localStorage.setItem('currentDesktopId', currDesktopId.toString());
      return true;
    }
  }
}
