import { Injectable } from '@angular/core';
import { Manager } from '../models/manager.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managers: Manager[] = this.getManagers();

  constructor() { }

  getManagers(): Manager[] {
    if (localStorage.getItem('managers') === '[]' || localStorage.getItem('managers') === null) 
      this.setDefaultManagers();
    this.managers = JSON.parse(localStorage.getItem('managers'));
    return this.managers;
  }

  findManager(username: string, password: string): Manager {
    return this.managers.find(manager => manager.username == username
      && manager.password == password);
  }

  getNextId(): number {
    return this.managers.length;
  }
  
  setDefaultManagers(): void {
    let defaultManagers = [
      new Manager(0, 'admin', '1111', null)
    ];
    localStorage.setItem('managers', JSON.stringify(defaultManagers));
  }
}
