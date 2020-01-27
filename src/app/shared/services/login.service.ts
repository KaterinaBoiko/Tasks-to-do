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

  private authorizedPerson: User | Manager;//| null
  backgroundUrl: string;

  private authorizedPersonSubject = new Subject<User | Manager | null>();
  public userEmitter = this.authorizedPersonSubject.asObservable();

  private backgroundSubject: Subject<number> = new Subject();
  public backgroundEmitter = this.backgroundSubject.asObservable();


  constructor(private userService: UserService,
    private managerService: ManagerService,
    private deskService: DesktopService,
    private router: Router) {
    this.authorizedPerson = JSON.parse(localStorage.getItem('authorizedPerson'));
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
        this.setUserBackground();
        this.authorizedPersonSubject.next(this.authorizedPerson);
        localStorage.setItem('authorizedPerson', JSON.stringify(this.authorizedPerson));
        this.router.navigateByUrl('/manager');
        return true;
      }
    }
    else {
      this.authorizedPerson = currUser;
      this.setUserBackground();
      this.authorizedPersonSubject.next(this.authorizedPerson);
      localStorage.setItem('authorizedPerson', JSON.stringify(this.authorizedPerson));
      let currDesktopId = this.deskService.getDesktopsByUserId(this.authorizedPerson.id)[0].id;
      localStorage.setItem('currentDesktopId', currDesktopId.toString());
      this.router.navigateByUrl(`/desktop`);
      return true;
    }
  }

  changeBackground(picture: string): void {
    this.authorizedPerson.backgroundUrl = picture;
    if ('desktopsId' in this.authorizedPerson) {
      this.managerService.managers.find(x => x.id == this.authorizedPerson.id).backgroundUrl = picture;
      this.managerService.saveManagers();
    }
    else {
      this.userService.users.find(x => x.id == this.authorizedPerson.id).backgroundUrl = picture;
      this.userService.saveUsers();
    }
    localStorage.setItem('authorizedPerson', JSON.stringify(this.authorizedPerson));
    let pictureIndex = Number(picture.match(/\d+/)[0]);
    this.backgroundSubject.next(pictureIndex);
  }

  setUserBackground(): void {
    console.log(this.authorizedPerson.backgroundUrl);
    if (this.authorizedPerson.backgroundUrl) {
      let pictureIndex = Number(this.authorizedPerson.backgroundUrl.match(/\d+/)[0]);
      this.backgroundSubject.next(pictureIndex);
    }
    else
      this.backgroundSubject.next(0);
  }
}
