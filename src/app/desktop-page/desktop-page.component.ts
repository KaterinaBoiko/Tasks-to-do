import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { DesktopService } from '../shared/services/desktop.service';
import { Desktop } from '../shared/models/desktop.model';

@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})
export class DesktopPageComponent implements OnInit {

  users: User[];
  desktops: Desktop[];
  
  constructor(private userService: UserService,
    private deskService: DesktopService) { }

  ngOnInit() {
    //this.userService.addUser(new User(this.userService.getNextId(), 'Mamba', 'qq','@mail'));

    this.users = this.userService.getUsers();
    this.desktops = this.deskService.getDesktops();
  }

 

}
