import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Manager } from '../models/manager.model';
import { UserService } from './user.service';
import { ManagerService } from './manager.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authorizedPerson: User | Manager | null;

  private user = new Subject<any>();
  public userEmitter = this.user.asObservable();

  userEmitChange(): Observable<any> {
    console.log(this.user);
    return this.user.asObservable();
  }

  constructor(private userService: UserService,
    private managerService: ManagerService) { 
      this.authorizedPerson = this.userService.getUsers()[0];//!!!
    }

  getAuthorizedPerson() : any {
    return this.authorizedPerson;
  }

  tryToSignIn(username: string, password: string): boolean {
    let currUser = this.userService.findUser(username, password);
    if (!currUser) {
      let currManager = this.managerService.findManager(username, password);
      if (!currManager)
        return false;
      else {
        this.authorizedPerson = currManager;
        this.user.next(this.authorizedPerson);
        return true;
      }
    }
    else {
      this.authorizedPerson = currUser;
      this.user.next(this.authorizedPerson);
      return true;
    }
  }
}
