import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = this.getUsers();

  constructor() { }

  getUsers(): User[] {
    if (localStorage.getItem('users') === '[]' || localStorage.getItem('users') === null)
      this.setDefaultUsers();
    this.users = JSON.parse(localStorage.getItem('users'));
    //this.removeUser(3);
    return this.users;
  }

  findUser(username: string, password: string): User {
    return this.users.find(user => user.username == username
      && user.password == password);
  }

  addUser(user: User): void {
    if (this.isValidUser(user)) {
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  removeUser(id: number): void {
    this.users.forEach((u, index) => {
      if (u.id === id) this.users.splice(index, 1);
    });
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isValidUser(user: User): boolean {
    for (let u of this.users) {
      if (u.id === user.id) {
        return false;
      }
    }
    return true;
  }

  getNextId(): number {
    return this.users.length;
  }

  setDefaultUsers(): void {
    let defaultUsers = [
      new User(0, 'Kateryna', 'qwerty', 'katerina.boiko16@gmail.com'),
      new User(1, 'Dmytro', '1111', 'naumthebest'),
      new User(2, 'Mary', 'mashka', null)
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
}
