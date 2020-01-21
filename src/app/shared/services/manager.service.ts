import { Injectable } from '@angular/core';
import { Manager } from '../models/manager.model';
import { DesktopService } from './desktop.service';
import { Desktop } from '../models/desktop.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  managers: Manager[] = this.getManagers();

  constructor(private deskService: DesktopService) { }

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
    let man1 = new Manager(1,'admin','1',null);
    man1.desktopsId.push(0);
    this.addSubordinatesDesktop(man1, this.deskService.getNextDesktopId(), 0);
    let defaultManagers = [
      new Manager(0, 'admin', '1111', null),
      man1
    ];
    localStorage.setItem('managers', JSON.stringify(defaultManagers));
  }

  addSubordinatesDesktop(manager:Manager, desktopId: number, userId: number): void {
    manager.desktopsId.push(desktopId);
    this.deskService.addDesktop(new Desktop(desktopId, 'Default', userId));
  }
}
