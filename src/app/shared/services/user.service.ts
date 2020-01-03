import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  defaultUsers: User[] = [
    new User(0, "Kateryna", "qwerty"),
    new User(1, "Dmytro", "1111"),
    new User(2, "Mary", "mashka")
  ];

  users: User[] = JSON.parse(localStorage.getItem('users'));;
  constructor() { }

  setDefaultUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.defaultUsers));
  }

  getUsers(): User[] {
    if (localStorage.getItem('users') === null) {
      this.setDefaultUsers();
      this.users = JSON.parse(localStorage.getItem('users'));
    }
    return this.users;
  }

  addUser(user: User): void {
    if (this.isValidUser(user)) {
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  removeUser(id: number): void {
    this.users.forEach( (u, index) => {
      if(u.id === id) this.users.splice(index,1);
    });
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isValidUser(user: User): boolean {
    for(let u of this.users){
      if (u.id === user.id){
        return false;
      }
    }
    return true;
  }
}
