import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { DesktopService } from '../shared/services/desktop.service';
import { User } from '../shared/models/user.model';
import { Manager } from '../shared/models/manager.model';
import { ManagerService } from '../shared/services/manager.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  authorizedPerson: User | Manager;
  isManager: boolean;

  constructor(private loginService: LoginService,
    private managerService: ManagerService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.authorizedPerson = this.loginService.getAuthorizedPerson();
    this.isManager = 'desktopsId' in this.authorizedPerson;
  }

  onSubmit(res: any) {
    let currPerson;
    if (this.isManager)
      currPerson = this.managerService.managers.find(x => x.id == this.authorizedPerson.id);
    else
      currPerson = this.userService.users.find(x => x.id == this.authorizedPerson.id);

    currPerson.username = res.username;
    currPerson.name = res.name;
    currPerson.surname = res.surname;
    currPerson.email = res.email;

    if (this.isManager)
      this.managerService.saveManagers();
    else
      this.userService.saveUsers();

    localStorage.setItem('authorizedPerson', JSON.stringify(currPerson));
  }

  deleteAccount(){
    let index = this.userService.users.findIndex(x => x.id == this.authorizedPerson.id);
    this.userService.users.splice(index, 1);
    this.userService.saveUsers();
    localStorage.setItem('authorizedPerson', null);
    this.router.navigateByUrl('/');
  }

}
