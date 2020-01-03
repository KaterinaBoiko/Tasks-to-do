import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';
import { Manager } from '../shared/models/manager.model';

@Component({
  selector: 'app-desktop-page',
  templateUrl: './desktop-page.component.html',
  styleUrls: ['./desktop-page.component.css']
})
export class DesktopPageComponent implements OnInit {

  users: User[];
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.addUser(new User(3, 'Mamba', 'qq','@mail', new Manager(0, "manager1", '1234')));
    this.users = this.userService.getUsers();
  }

 

}
